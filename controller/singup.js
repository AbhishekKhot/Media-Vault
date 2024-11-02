"use strict";
const userService = require("../services/users");

async function signup(request, reply) {
  const body = request.body;
  const res = await userService.createUser(body);
  this.sendSuccessResponse(reply, res);
}

async function getUser(request, reply) {
  const { id } = request.params;
  const user = await userService.getUser(id);
  this.sendSuccessResponse(reply, user);
}

async function getUsers(request, reply) {
  const users = await userService.getUsers(request.params);
  this.sendSuccessResponse(reply, users);
}
module.exports = {
  signup,
  getUser,
  getUsers,
};
