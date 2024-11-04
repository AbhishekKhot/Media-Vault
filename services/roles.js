"use strict";

const db = require("../common/sequelize")();

class Role {
  async createRole(data) {
    return await db.Role.findOrCreate({
      where: {
        label: data.label,
        creator_id: data.creator_id,
      },
      defaults: data,
    });
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
