"use strict";
const db = require("../common/sequelize")();
const bcrypt = require("bcryptjs");
class User {
  async createUser(body) {
    const { password } = body;
    return await db.User.create({
      ...body,
      password: bcrypt.hashSync(password, 8),
    });
  }
  async getUserAndRoles(email) {
    return await db.User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: db.Role,
          as: "createdRoles",
        },
        {
          model: db.Role,
          through: db.UserRole,
          as: "roles",
        },
      ],
    });
  }
  async getUser(email) {
    return await db.User.findOne({
      where: {
        email: email,
      },
    });
  }
}

module.exports = new User();
