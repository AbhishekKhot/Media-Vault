"use strict";

import fp from "fastify-plugin";
import connectToDB from "../common/sequelize.js";

export default fp(async (fastify) => {
  const db = connectToDB();
  fastify.decorate("sequelize", db);
  fastify.addHook("onClose", async () => await db.sequelize.close());
});
