"use strict";
const { createUserRole } = require("../../controller/user_roles");

module.exports = async function userRolesRoute(fastify) {
  const API_PREFIX = "/user_roles";

  fastify.route({
    method: "POST",
    url: API_PREFIX,
    handler: createUserRole,
  });
};
