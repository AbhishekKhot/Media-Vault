"use strict";

const { httpPostJson } = require("./utils/http-actions.js");
const path = require("path");
const autoLoad = require("@fastify/autoload");
const { successHandler } = require("./utils/success-handler.js");

module.exports = async function (fastify, opts) {
  fastify.decorate("httpPostRequest", httpPostJson);
  fastify.decorate("sendSuccessResponse", successHandler);

  fastify.register(autoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
  });
};
