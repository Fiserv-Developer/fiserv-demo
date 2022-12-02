import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';


export function getValueOrDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value) {
    return value;
  } else {
    return defaultValue;
  }
}

export async function fetchWithRetry(url, options = {}, attempts = 1) {
  const maxAttempts = 3;
  var wait = 1000; // milliseconds

  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    } else if (attempts <= maxAttempts) {
      if (attempts > 1) {
        wait = wait * 2; // double the wait between each attempt for backoff
      }
      return new Promise(res => { 
        setTimeout(res, wait); 
      }).then(() => { 
        return fetchWithRetry(url, options, attempts + 1);
      }); 
    } else {
      return Promise.reject(response.json());
    }
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
    body: JSON.stringify(body),
  };

  fetch(options);
}