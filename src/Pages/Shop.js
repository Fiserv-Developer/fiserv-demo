import React, { useState } from 'react';
import Products from '../Components/Shop/Products';
import { config } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';

export default function Shop() {
  const baseUrl = config.nonProdBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");
  const [basket, setBasket] = useState([]);

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
             "successUrl": "https://demo.fiserv.dev/checkout-success", // todo improve callback flow
             "failureUrl": "https://demo.fiserv.dev/checkout-failure"
        }
      },
    };
  
    withSignature(apiKey, secretKey,
      "POST",
      data,
      (options) => fetchWithRetry(url, options)
        .then(data => window.location.href = data.checkout.redirectionUrl)
        .catch(rejected => {
          window.location.href = "/shop?failure=true"; // todo improve callback flow
        }));
  }

  return (<Products basket={basket} setBasket={setBasket} checkout={checkout}/>);
}