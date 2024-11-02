const {
  signup,
  getUser,
  getUsers,
} = require("../../controller/singup");

module.exports = async function singupRoute(fastify) {
  const API_PREFIX = "/users";

  fastify.route({ method: "GET", url: API_PREFIX, handler: getUsers });

  fastify.route({ method: "GET", url: API_PREFIX + "/:id", handler: getUser });

  fastify.route({
    method: "POST",
    url: API_PREFIX + "/signup",
    handler: signup,
  });
};
