"use strict";
const db = require("../common/sequelize")();

class User {
  async createUser(body) {
    return await db.User.create(body);
  }
  async getUser(id) {
    return await db.User.findByPk(id, {
      include: [
        {
          model: db.UserRole,
          include: [
            {
              model: db.Role,
              attribute: ["label", "description"],
            },
          ],
        },
      ],
      raw: true,
    });
  }
  async getUsers(params) {
    return await db.findAll({ raw: true, ...params });
  }
}

module.exports = new User();
