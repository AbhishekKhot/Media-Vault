"use strict";

const db = require("../common/sequelize")();
class UserRole {
  async createUserRole(data) {
    return await db.UserRole.create(data);
  }
}

module.exports = new UserRole();
