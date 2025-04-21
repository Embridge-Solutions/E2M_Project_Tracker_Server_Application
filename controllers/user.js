const { result } = require('lodash');
const { db } = require('../models');
const bcrypt = require('bcryptjs');

const create = async (req, res) => {
  const { name, username, email, password, role, deptId } = req.body;

  try {
    // check if user already exited alert code
    const userCheck = await db.E2M_User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (userCheck)
      return res.status(403).json({ msg: 'Username already exists' });

    const salt = bcrypt.genSaltSync(10);
    const userCreate = await db.E2M_User.create({
      name,
      username,
      email,
      subdepartmentId: deptId,
      password: bcrypt.hashSync(password, salt),
      role,
      isAdmin: role == 1 ? true : false,
    });

    // get user by id
    const user = await db.E2M_User.findOne({
      where: {
        id: userCreate.id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    // get role by id
    // const roleData = await Role.findOne({
    //   where: {
    //     id: user.role,
    //   },
    // });
    // user.role = roleData;
    res.status(200).json({ msg: 'User Created Successfully...!', Data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const view = async (req, res) => {
  try {
    const users = await db.E2M_User.findAll({
      where: {
        isDeleted: false,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    let userData = [];
    users.map((da) => {
      userData.push({
        id: da.id,
        userId: da.userId,
        name: da.name,
        username: da.username,
        email: da.email,
        password: da.password,
        role: da.role,
        isAdmin: da.isAdmin == 1 ? 'true' : 'false',
      });
    });

    res.status(200).json({ msg: 'Users Founded..!', data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, userName, role, email } = req.body;

  try {
    // check if user already exists by username for other user id
    // const userCheck = await db.E2M_User.findOne({
    //   where: {
    //     id: {
    //       [Op.ne]: id,
    //     },
    //     userName,
    //     isDeleted: false,
    //   },
    // });
    // if (userCheck) {
    //   return res.status(400).json({ msg: 'Username Already Exist' });
    // }

    // get user by id
    const user = await db.E2M_User.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Founded' });
    }

    // let userPassword = user.password;
    // if (password != null && password != undefined && password != '') {
    //   const salt = bcrypt.genSaltSync(10);
    //   userPassword = bcrypt.hashSync(password, salt);
    // }

    // update user
    const userUpdate = await db.E2M_User.update(
      {
        name,
        user,
        // password: userPassword,
        role,
        email,
        isAdmin: role == 1 ? true : false,
      },
      {
        where: {
          id,
        },
      }
    );

    // get user by id
    const updatedUser = await db.E2M_User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });

    // get role by id
    const roleData = await db.E2M_Role.findOne({
      where: {
        name: updatedUser.role,
      },
    });
    updatedUser.role = roleData;
    res.status(200).json({ msg: 'User Updated', data: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const archive = async (req, res) => {
  const { id } = req.params;
  try {
    // get user by id
    const user = await db.E2M_User.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Founded' });
    }
    // delete user
    await db.E2M_User.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id,
        },
      }
    );
    const userData = await db.E2M_User.findAll({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ msg: 'User Deleted', data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const changeUserPassword = async (req, res) => {
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

    //check Old Password

    const isMatch_OldPassword = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isMatch_OldPassword) {
      return res.status(400).json({ msg: 'Old Password is Wrong' });
    }

    //compare old password and New Password

    const isMatch = await bcrypt.compare(confirmPassword, user.password);
    if (isMatch) {
      return res.status(400).json({ msg: 'Password is Already Exists' });
    }

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
  create,
  view,
  update,
  archive,
  changeUserPassword,
};
