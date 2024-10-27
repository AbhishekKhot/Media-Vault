"use strict";

export const config = {
  disableRequestLogging: false,
  requestIdLogLabel: false,
  requestIdHeader: "x-request-id",
  logger: {
    level: process.env.LOG_LEVEL || "info",
    timestamp: () => {
      const dateString = new Date().toISOString();
      return `,"time":"${dateString}"`;
    },
    redact: {
      censor: "***",
      paths: [
        "req.headers.authorization",
        "req.body.password",
        "req.body.email",
      ],
    },
    serializers: {
      req: function (request) {
        const shouldLogBody = request.routeConfig.logBody === true;
        return {
          method: request.method,
          url: request.raw.url,
          routeUrl: request.routerPath,
          version: request.headers?.["accept-version"],
          user: request.user?.id,
          headers: request.headers,
          body: shouldLogBody ? request.body : undefined,
          hostname: request.hostname,
          remoteAddress: request.ip,
          remotePort: request.socket?.remotePort,
        };
      },
      res: function (reply) {
        return {
          method: reply.request?.method,
          url: reply.request?.url,
          routeUrl: reply?.request.routerPath,
          statusCode: reply.statusCode,
          responseTime: reply.getResponseTime(),
        };
      },
    },
  },
};
