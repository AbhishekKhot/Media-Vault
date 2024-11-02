"use strict";

const { createRole, getRolesByCreator } = require("../../controller/roles");

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
};
