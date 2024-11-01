require("dotenv").config();
const Fastify = require("fastify");

const closeWithGrace = require("close-with-grace");

const options = require("./common/logging-options.js");
const app = Fastify(options);

// Register your application as a normal plugin.
const appService = require("./app.js");
app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 },
  // eslint-disable-next-line no-unused-vars
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook("onClose", async (instance, done) => {
  closeListeners.uninstall();
  done();
});

app.addHook("onRequest", (request, reply, done) => {
  reply.startTime = process.hrtime();
  done();
});

app.addHook("onResponse", (request, reply, done) => {
  const hrtime = process.hrtime(reply.startTime);
  reply.elapsedTime = hrtime[0] * 1000 + hrtime[1] / 1000000;
  done();
});

// Start listening.
app.listen({ port: process.env.PORT || 8080, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
