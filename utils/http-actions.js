"use strict";

const axios = require("axios");

async function httpRequest({
  url,
  method = "GET",
  requestData = null,
  params = null,
  headers = {},
  isRetry = true,
  maxAttempts = 5,
  currentAttempt = 1,
  validateStatus = (status) => status >= 200 && status < 300,
}) {
  try {
    const response = await axios({
      url,
      method,
      data: requestData,
      params,
      headers: { "Content-Type": "application/json", ...headers },
      validateStatus,
    });

    return response;
  } catch (error) {
    const isRetryable =
      isRetry &&
      currentAttempt < maxAttempts &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    console.log(
      `HTTP ${method} attempt ${currentAttempt} failed: ${
        error.message
      } (status: ${error.response?.status || "unknown"}).`
    );

    if (isRetryable) {
      const retryDelay = Math.pow(2, currentAttempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return httpRequest({
        url,
        method,
        requestData,
        params,
        headers,
        isRetry,
        maxAttempts,
        currentAttempt: currentAttempt + 1,
        validateStatus,
      });
    }

    throw error;
  }
}

function createHttpMethod(method) {
  return (options = {}) => httpRequest({ ...options, method });
}

const httpGetJson = createHttpMethod("GET");
const httpPostJson = createHttpMethod("POST");
const httpPutJson = createHttpMethod("PUT");

module.exports = { httpGetJson, httpPostJson, httpPutJson };
