"use strict";

import httpPostJson from "./utils/http-actions.js";
import path from "path";
import autoLoad from "@fastify/autoload";
import successHandler from "./utils/success-handler.js";
import { config } from "./lib/logger.js";

export default async function (fastify, opts) {
  fastify.decorate("httpPostRequest", httpPostJson);
  fastify.decorate("sendSuccessResponse", successHandler);

  fastify.register(autoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
  });
}

export const options = config;
