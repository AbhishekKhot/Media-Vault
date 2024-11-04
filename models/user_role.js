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
        validate: {
          notNull: {
            msg: "User ID is required.",
          },
          notEmpty: {
            msg: "User ID must be an integer.",
          },
        },
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Role ID is required.",
          },
          notEmpty: {
            msg: "Role ID must be an integer.",
          },
        },
      },
      expiry_date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        validate: {
          notNull: {
            msg: "Expiry time is required.",
          },
          notEmpty: {
            msg: "Expiry time must be a valid date.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "user_roles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return UserRole;
};
