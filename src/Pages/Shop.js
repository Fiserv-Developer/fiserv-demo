import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CheckoutFailure from '../Components/Shop/CheckoutFailure';
import CheckoutSuccess from '../Components/Shop/CheckoutSuccess';
import Products from '../Components/Shop/Products';
import { config } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault } from '../Config/utils';

export default function Shop() {
  const baseUrl = config.nonProdBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");
  const [basket, setBasket] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const checkout = () => {
    const basketTotal = basket.reduce((partialSum, item) => partialSum + (parseFloat(item.value) * item.quantity), 0).toFixed(2);
    const url = baseUrl + "/checkouts";
    const data = {
      "storeId": "72305408",
      "transactionType": "SALE",
      "transactionAmount": {
        "currency": "EUR",
        "total": parseFloat(basketTotal)
      },
      "checkoutSettings": {
        "locale": null,
        "preSelectedPaymentMethod": null,
        "webHooksUrl": null,
        "redirectBackUrls": {
             "successUrl": "https://demo.fiserv.dev/shop?success=true", // todo improve callback flow
             "failureUrl": "https://demo.fiserv.dev/shop?failure=true"
        }
      },
    };
  
    function withSignature(method, body, callback) {
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
    
      callback(options);
    }
    
    withSignature(
      "POST",
      data,
      (options) => fetchWithRetry(url, options)
        .then(data => window.location.href = data.checkout.redirectionUrl)
        .catch(rejected => {
          window.location.href = "/shop?failure=true"; // todo improve callback flow
        }));
  }

  if (searchParams.get('success')) {
    return <CheckoutSuccess />;
  } else if (searchParams.get('failure')) {
    return <CheckoutFailure />;
  } else {
    return (<Products basket={basket} setBasket={setBasket} checkout={checkout}/>);
  }
}