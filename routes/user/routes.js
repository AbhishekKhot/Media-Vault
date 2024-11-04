const { signup, signin } = require("../../controller/user");

module.exports = async function singupRoute(fastify) {
  const API_PREFIX = "/users";

  fastify.route({
    method: "POST",
    url: API_PREFIX + "/signup",
    handler: signup,
  });

  fastify.route({
    method: "POST",
    url: API_PREFIX + "/sigin",
    handler: signin,
  });
};
