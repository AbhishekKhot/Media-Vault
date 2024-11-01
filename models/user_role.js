"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      UserRole.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
        targetKey: "id",
      });
    }
  }
  UserRole.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      expiry_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
