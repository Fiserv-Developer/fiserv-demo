import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export function getValueOrDefault(key, defaultValue) {
  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return defaultValue;
  }

  return isJsonObject(rawValue) ? JSON.parse(rawValue) : rawValue;
}

function isJsonObject(object) {
  if (object === null || object === undefined || object.length === 0) {
      return false;
  }

  if (object[0] === '"' || object[0] === '[' || object[0] === '{') {
    return true;
  }

  return false;
}

export async function fetchWithRetry(url, options = {}, attempt = 1, waitMillis = 500) {
  const maxAttempts = 3;

  const reattempt = (response) => {
    const nextAttempt = attempt + 1;
    const nextWaitMillis = waitMillis * 2; // increase the wait between each attempt for backoff

    if (nextAttempt <= maxAttempts) {
      return new Promise(res => {
        setTimeout(res, nextWaitMillis);
      }).then(() => {
        return fetchWithRetry(url, options, nextAttempt, nextWaitMillis); 
      });
    } else {
      return Promise.reject(response);
    }
  }

  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    } else { // for any 4x / 5x errors such as 429
      return reattempt(response);
    }
  }).catch(rejected => { // for any network errors
    return reattempt(rejected);
  });
}

export function withSignature(apiKey, secretKey, method, body, fetch) {
  var ClientRequestId = uuidv4();
  var time = new Date().getTime();
  var requestBody = JSON.stringify(body);
  if (method === 'GET') {
    requestBody = '';
  }  
  const messageSignatureString = apiKey + ClientRequestId + time + requestBody;
  const messageSignature = CryptoJS.HmacSHA256(messageSignatureString, secretKey);
  const messageSignatureBase64 = CryptoJS.enc.Base64.stringify(messageSignature);

  var options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Client-Request-Id": ClientRequestId,
      "Api-Key": apiKey,
      "Timestamp": time.toString(),
      "Message-Signature": messageSignatureBase64
    },
  };

  if (method !== 'GET') {
    options.body = requestBody;
  }

  fetch(options);
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}