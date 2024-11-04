"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
        otherKey: "role_id",
        as: "roles",
      });
      User.hasMany(models.Role, {
        foreignKey: "creator_id",
        as: "createdRoles",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name is required.",
          },
          notEmpty: {
            msg: "First name cannot be empty.",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name is required.",
          },
          notEmpty: {
            msg: "Last name cannot be empty.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "The email address is already registered. Please use a different one.",
        },
        isEmail: true,
        validate: {
          isEmail: {
            msg: "Please provide a valid email address.",
          },
          notNull: {
            msg: "Email is required.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required.",
          },
          notEmpty: {
            msg: "Password cannot be empty.",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
