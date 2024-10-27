"use strict";

import axios from "axios";
import { options } from "../app";

async function httpRequest({
  url,
  requestData,
  params,
  headers = {},
  isRetry = true,
  maxAttempts = 5,
  currentAttempt = 1,
  method = "GET",
  validateStatus = (status) => status >= 200 && status < 300,
}) {
  const config = {
    url,
    method,
    data: requestData,
    params,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    validateStatus,
  };
  try {
    const response = await axios(config);
    if (response.status >= 200 && response.status < 300) return response;
    const msg = `${
      response.status
    }, Failed to send HTTP ${method} request [attempt ${currentAttempt}]: ${JSON.stringify(
      requestData
    )} url=${url}`;
    console.log(msg);
    if (
      isRetry &&
      currentAttempt < maxAttempts &&
      response.status >= 400 &&
      response.status < 500
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, currentAttempt) * 1000)
      );

      return httpRequest({
        url,
        requestData,
        params,
        headers,
        isRetry: true,
        maxAttempts,
        method,
        currentAttempt: currentAttempt + 1,
      });
    } else {
      return response;
    }
  } catch (error) {
    console.log(
      `HTTP ${method} error [attempt ${currentAttempt}]: ${error.message}`
    );
  }
}

export async function httpGetJson(options = {}) {
  options.method = "GET";
  return httpRequest(options);
}

export async function httpPostJson(options = {}) {
  options.method = "POST";
  return httpRequest(options);
}

export async function httpPutJson(options = {}) {
  options.method = "PUT";
  return httpRequest(options);
}
