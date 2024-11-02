"use strict";

module.exports = async function root(fastify) {
  fastify.get("/health", async function healthCheckHandler(_, reply) {
    this.sendSuccessResponse(reply, "Ok");
  });
};
