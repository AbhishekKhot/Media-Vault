"use strict";

const db = require("../common/sequelize")();
class UserRole {
  async createUserRole(data) {
    return await db.UserRole.findOrCreate({
      where: { ...data },
      defaults: data,
    });
  }
}

module.exports = new UserRole();
