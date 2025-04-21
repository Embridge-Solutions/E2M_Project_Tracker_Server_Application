'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class E2M_Scope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  E2M_Scope.init(
    {
      scope: DataTypes.STRING,
      description: DataTypes.STRING,
      access: DataTypes.STRING,
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'E2M_Scope',
    }
  );
  return E2M_Scope;
};
