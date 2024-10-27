"use strict";

const fp = require("fastify-plugin");
const connectToDB = require("../common/sequelize.js");

module.exports = fp(async (fastify) => {
  const db = connectToDB();
  fastify.decorate("sequelize", db);
  fastify.addHook("onClose", async () => await db.sequelize.close());
});
