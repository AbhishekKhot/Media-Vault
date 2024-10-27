"use strict";

module.exports = async function root(fastify) {
  fastify.get("/health", async function healthCheckHandler(request, reply) {
    reply.status(200).send({ status: "Ok" });
  });
};

module.exports;
