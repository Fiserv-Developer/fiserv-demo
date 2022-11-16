import { Button, useTheme } from '@mui/material';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BodyElement from '../Components/BodyElement';
import Placeholder from '../Components/Placeholder';
import { config } from '../Config/constants';
import { products } from '../Config/data';
import { fetchWithRetry, getValueOrDefault } from '../Config/utils';

export default function Shop() {
  const baseUrl = config.nonProdBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");
  const [processing, setProcessing] = useState(false);

  if (processing) {
    return <Placeholder />
  } else {
    return (
      <React.Fragment>
        <BodyElement xs={12} md={12} lg={12}>
          <h1>Shop</h1>
          <p>Welcome to this amazing ecommerce shop, select a product to instantly buy!</p>
        </BodyElement>
        {products.map((item) => <Item setProcessing={setProcessing} key={item.name} baseUrl={baseUrl} apiKey={apiKey} secretKey={secretKey} name={item.name} value={item.value} />)}
      </React.Fragment>
    );
  }
}

function Item(props) {
  const theme = useTheme();
  return (
    <BodyElement xs={12} md={4} lg={3}>
      <img alt={props.name + " product photo"} src={ "../products/" + props.name.toLowerCase() + ".jpeg" } />
      <p><b>{props.name}</b></p>
      <p>£{props.value}</p>
      <Button sx={{color: theme.palette.text.main}} onClick={() => buy(props.baseUrl, props.apiKey, props.secretKey, props.setProcessing)}>One-click Buy</Button>
    </BodyElement>
  );
} 

function buy(baseUrl, apiKey, secretKey, setProcessing) {
  setProcessing(true);
  const url = baseUrl + "/checkouts";

  const dummyData = {
    "storeId": "72305408",
    "transactionType": "SALE",
    "transactionAmount": {
      "currency": "EUR",
      "total": 12.99
    },
    "checkoutSettings": {
      "locale": null,
      "preSelectedPaymentMethod": null,
      "webHooksUrl": null,
      "redirectBackUrls": {
           "successUrl": "https://demo.fiserv.dev/shop-success",
           "failureUrl": "https://demo.fiserv.dev/shop-failure"
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
    dummyData,
    (options) => fetchWithRetry(url, options)
      .then(data => window.location.href = data.checkout.redirectionUrl)
      .catch(rejected => {
        console.log("Failed!", rejected);
        window.location.href = "/shop-failure";
      }));
}
