"use strict";

const userRoleService = require("../services/user_roles");

async function createUserRole(request, reply) {
  const res = await userRoleService.createUserRole(request.body);
  this.sendSuccessResponse(reply, res);
}

module.exports = {
  createUserRole,
};
