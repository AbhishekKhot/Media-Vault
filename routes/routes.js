"use strict";

module.exports = async function root(fastify) {
  fastify.get("/_health", async function healthCheckHandler(_, reply) {
    reply.sendSuccessResponse("Ok");
  });
};
