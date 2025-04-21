const { E2M_User, db } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../data/env');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user alter exited in username
    const user = await db.E2M_User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });
    if (!user) return res.status(303).json({ msg: 'Invalid Credentials' });
    const role = await db.E2M_Role.findOne({
      where: {
        isDeleted: false,
        name: user.role,
      },
    });
    if (!role) return res.status(303).json({ msg: 'role Invalid' });

    //check if password correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(303).json({ msg: 'Password Invalid..!' });
    // create jwt token
    const payload = {
      id: user.id,
      name: user.name,
      userName: user.username,
      email: user.email,
      role: user.role,
      dept_access: user.subdepartmentId,
      access: role.access == undefined ? null : btoa(role.access),
    };

    // generate jwt token
    const token = await jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRATION,
    });

    // generate refresh jwt token
    const refreshToken = await jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRATION,
    });

    res.status(200).json({
      msg: 'Login successfully',
      token,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

const forgetPassword = async (req, res) => {
  const { username, oldPassword, password, confirmPassword } = req.body;

  try {
    // check if user alter exited in username
    const user = await db.E2M_User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (!user) return res.status(400).json({ msg: 'User Not Found' });

    //compare old password and New Password

    const isMatch = await bcrypt.compare(confirmPassword, user.password);
    if (isMatch) {
      return res.status(400).json({ msg: 'Password is Already Exists' });
    }

    //check old password is correct

    // const isMatch = await bcrypt.compare(oldPassword, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ msg: 'Old Password is Wrong' });
    // }

    //update new password
    const salt = bcrypt.genSaltSync(10);
    const passwordUpdate = await db.E2M_User.update(
      {
        password: bcrypt.hashSync(confirmPassword, salt),
      },
      {
        where: {
          username,
          isDeleted: false,
        },
      }
    );

    res.status(200).json({
      msg: 'Password Changed Successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  login,
  forgetPassword,
};
