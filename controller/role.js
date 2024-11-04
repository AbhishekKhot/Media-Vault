"use strict";

const roleService = require("../services/roles");
const userRoleService = require("../services/user_roles");

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

async function addUserAccess(request, reply) {
  const res = await userRoleService.createUserRole(request.body);
  this.sendSuccessResponse(reply, res);
}

module.exports = {
  createRole,
  getRolesByCreator,
  addUserAccess,
};
