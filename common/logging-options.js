"use strict";

const crypto = require("crypto");

module.exports = {
  // Request Handling Configuration
  requestConfig: {
    connectionTimeout: 30000, // 30 seconds
    keepAliveTimeout: 30000,
    requestTimeout: 30000,
    bodyLimit: 5 * 1024 * 1024, // 5MB
    disableRequestLogging: false,
    maxRequestsPerSocket: 0, // Unlimited
  },

  // Request ID Generation
  requestId: {
    header: "x-request-id",
    logLabel: "requestId",
    generate: (req) => req.headers["x-request-id"] || crypto.randomUUID(),
  },

  // Proxy and Security
  proxyConfig: {
    trustProxy: true,
    onProtoPoisoning: "remove",
    onConstructorPoisoning: "remove",
    return503OnClosing: true,
  },

  // Logging Configuration
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
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    redact: {
      censor: "***",
      paths: [
        "req.headers.authorization",
        "req.headers['x-api-key']",
        "req.body.password",
        "req.body.passwordConfirmation",
        "req.body.email",
        "req.body.token",
        "req.body.cardNumber",
        "req.body.cvv",
        "req.body.expiryDate",
        "req.body.ssn",
        "req.body.dob",
      ],
    },
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.raw.url,
        routeUrl: req.routerPath,
        version: req.headers?.["accept-version"],
        user: req.user?.id,
        headers: req.headers,
        body: req.routeConfig?.logBody ? req.body : undefined,
        hostname: req.hostname,
        remoteAddress: req.ip,
        remotePort: req.socket?.remotePort,
        reqId: req.id,
      }),
      res: (res) => ({
        method: res.request?.method,
        url: res.request?.url,
        routeUrl: res.request?.routerPath,
        statusCode: res.statusCode,
        responseTime: res.elapsedTime || res.raw.elapsedTime,
        reqId: res.request?.id,
      }),
      err: (err) => ({
        type: err.type,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        code: err.code,
        statusCode: err.statusCode,
      }),
    },
    customLogLevel: (res) => {
      if (res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
  },

  // Graceful Shutdown
  gracefulShutdown: {
    closeGracePeriod: 10000, // 10 seconds
  },

  // CORS Configuration
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
