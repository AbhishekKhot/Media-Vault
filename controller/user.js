"use strict";
const bcrypt = require("bcryptjs");
const userService = require("../services/users");
const { checkValue } = require("../utils/helper-functions");

async function signup(request, reply) {
  const body = request.body;
  const res = await userService.createUser(body);
  this.sendSuccessResponse(reply, res);
}

async function signin(request, reply) {
  const { email, password: hashPassword } = request.body;
  const user = await userService.getUser(email);
  if (!checkValue(user))
    return this.sendSuccessResponse(reply, "User not found", 404);
  const isPasswordValid = bcrypt.compareSync(hashPassword, user.password);
  if (!isPasswordValid)
    return this.sendSuccessResponse(reply, "Invalid password", 403);
  const userWithRoles = await userService.getUserAndRoles(email);
  this.sendSuccessResponse(reply, userWithRoles);
}

module.exports = {
  signup,
  signin,
};
