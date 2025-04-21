const jwt = require('jsonwebtoken');
const { db } = require('../models');
const ENV = require('../data/env');

module.exports = async (req, res, next) => {
  const Authorization = req.headers.authorization;
  const refreshToken = req.headers.refreshtoken;
  if (!Authorization)
    return res
      .status(401)
      .json({ error: true, message: 'Unauthorized Access' });
  const token = Authorization.replace('Bearer ', '');
  jwt.verify(token, ENV.JWT_SECRET, async function (err, decoded) {
    if (err) {
      if (err.name == 'TokenExpiredError') {
        if (!refreshToken)
          return res
            .status(401)
            .json({ error: true, message: 'Unauthorized Access' });

        jwt.verify(
          refreshToken,
          ENV.REFRESH_TOKEN_SECRET,
          async function (err, decoded) {
            if (err) {
              return res
                .status(401)
                .json({ error: true, message: 'Unauthorized Access' });
            }
            const user = await db.User.findOne({
              where: { id: decoded.id, isDeleted: false },
            });
            if (!user) {
              return res
                .status(401)
                .json({ error: true, message: 'Unauthorized Access' });
            }
            // get role by id
            const role = await db.Role.findOne({
              where: {
                id: user.role,
              },
            });

            const payload = {
              id: user.id,
              name: user.name,
              isAdmin: user.isAdmin,
              roleName: role.name == undefined ? null : role.name,
              roleId: role.id == undefined ? null : role.id,
            };

            const jwtToken = jwt.sign(payload, ENV.JWT_SECRET, {
              expiresIn: ENV.JWT_EXPIRATION,
            });
            const jwtRefreshToken = jwt.sign(
              payload,
              ENV.REFRESH_TOKEN_SECRET,
              {
                expiresIn: ENV.REFRESH_TOKEN_EXPIRATION,
              }
            );
            req.user = user;
            res.setHeader('Access-Control-Expose-Headers', '*');
            res.setHeader('newtoken', jwtToken);
            res.setHeader('newrefreshtoken', jwtRefreshToken);
            next();
          }
        );
      }
    } else {
      const user = await db.User.findOne({
        where: { id: decoded.id, isDeleted: false },
      });
      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: 'Unauthorized Access' });
      }
      req.user = user;
      res.setHeader('Access-Control-Expose-Headers', '*');
      res.setHeader('newtoken', null);
      res.setHeader('newrefreshtoken', null);
      next();
    }
  });
};
