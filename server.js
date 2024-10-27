"use strict";

import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import closeWithGrace from "close-with-grace";
import config from "./lib/logger";

const fastifyApp = Fastify(config);
import app from "./app";
fastifyApp.register(app);

const closeListeners = closeWithGrace({
  delay: process.FASTIFY_CLOSE_GRACE_DELAY || 1000,
  async function({ signal, error, manual }) {
    if (error) {
      app.log.error(error);
    }
    await app.close();
  },
});

app.addHook("onClose", async (_, done) => {
  closeListeners.uninstall();
  done();
});

app.listen({ port: process.env.PORT || 8080, host: "0.0.0.0" }, (error) => {
  if (error) {
    app.log(error);
    process.exit(1);
  }
});

