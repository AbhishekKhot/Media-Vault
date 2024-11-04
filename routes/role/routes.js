"use strict";

const {
  createRole,
  getRolesByCreator,
  addUserAccess,
} = require("../../controller/role");

module.exports = async function rolesRoute(fastify) {
  const API_PREFIX = "/roles";

  fastify.route({
    method: "POST",
    url: API_PREFIX,
    handler: createRole,
  });

  fastify.route({
    method: "GET",
    url: API_PREFIX,
    handler: getRolesByCreator,
  });

  fastify.route({
    method: "POST",
    url: API_PREFIX + "/add-access",
    handler: addUserAccess,
  });
};
