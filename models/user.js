'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class E2M_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  E2M_User.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.STRING,
      role: DataTypes.STRING,
      subdepartmentId: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'E2M_User',
    }
  );
  return E2M_User;
};
