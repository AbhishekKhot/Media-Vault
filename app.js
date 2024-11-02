"use strict";
require("dotenv").config();
const path = require("path");
const AutoLoad = require("@fastify/autoload");
const { httpPostJson } = require("./utils/http-actions");
const successHandler = require("./utils/success-handler");

module.exports = async function (fastify, opts) {
  fastify.decorate("httpPostRequest", httpPostJson);
  fastify.decorate("sendSuccessResponse", successHandler);

  //register plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
  });

  //register routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: {
      user: "user",
    },
    options: Object.assign({}, opts),
  });
};
