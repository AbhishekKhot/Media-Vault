"use strict";

const db = require("../common/sequelize")();

class Role {
  async createRole(data) {
    return await db.Role.create(data);
  }
  async getRolesByCreator(creatorId) {
    return await db.Role.findAll({
      where: {
        creator_id: creatorId,
      },
      attributes: ["label", "description", "created_at"],
    });
  }
}

module.exports = new Role();
