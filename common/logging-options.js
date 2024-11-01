"use strict";

const path = require("path");
const crypto = require("crypto");

module.exports = {
  // Request handlings
  connectionTimeout: 30000, // 30 seconds
  keepAliveTimeout: 30000,
  maxRequestsPerSocket: 0, // Unlimited requests per socket
  requestTimeout: 30000,
  bodyLimit: 5 * 1024 * 1024, // 1MB
  disableRequestLogging: false,

  // Request ID configuration
  requestIdHeader: "x-request-id",
  requestIdLogLabel: "requestId",
  genReqId: (req) => {
    return req.headers["x-request-id"] || crypto.randomUUID();
  },

  // Trust proxy for correct client IP when behind load balancer
  trustProxy: true,

  // Security related options
  onProtoPoisoning: "remove",
  onConstructorPoisoning: "remove",

  // Return 503 when server is shutting down
  return503OnClosing: true,

  // Logging configuration
  logger: {
    level: process.env.LOG_LEVEL || "info",
    development: process.env.NODE_ENV !== "production",
    transport:
      process.env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
    timestamp: () => {
      const dateString = new Date().toISOString();
      return `,"time":"${dateString}"`;
    },
    redact: {
      censor: "***",
      paths: [
        // Security related
        "req.headers.authorization",
        'req.headers["x-api-key"]',
        "req.body.password",
        "req.body.passwordConfirmation",
        "req.body.email",
        "req.body.token",
        // Payment related
        "req.body.cardNumber",
        "req.body.cvv",
        "req.body.expiryDate",
        // Personal information
        "req.body.ssn",
        "req.body.dob",
      ],
    },
    serializers: {
      req: function (request) {
        const shouldLogBody = request.routeConfig?.logBody === true;
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
          reqId: request.id,
        };
      },
      res: function (reply) {
        return {
          method: reply.request?.method,
          url: reply.request?.url,
          routeUrl: reply?.request.routerPath,
          statusCode: reply.statusCode,
          responseTime: reply.elapsedTime || reply.raw.elapsedTime,
          reqId: reply.request?.id,
        };
      },
      err: function (err) {
        return {
          type: err.type,
          message: err.message,
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
          code: err.code,
          statusCode: err.statusCode,
        };
      },
    },
    // Customize log level based on HTTP status code
    customLevels: {
      http: 35,
    },
    customLogLevel: function (res, err) {
      if (res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  },

  // Graceful shutdown configuration
  closeGracePeriod: 10000, // 10 seconds to finish ongoing requests

  // CORS configuration if needed
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(",") || false,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "x-request-id",
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
};
