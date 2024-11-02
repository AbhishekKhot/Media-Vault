"use strict";

const roleService = require("../services/roles");

async function createRole(request, reply) {
  const res = await roleService.createRole(request.body);
  this.sendSuccessResponse(reply, res);
}

async function getRolesByCreator(request, reply) {
  const userRoles = await roleService.getRolesByCreator(
    request.query.creator_id
  );
  this.sendSuccessResponse(reply, userRoles);
}

module.exports = {
  createRole,
  getRolesByCreator,
};
