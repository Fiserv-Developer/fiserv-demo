import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { getValueOrDefault } from '../Config/utils';
import { config } from '../Config/constants';
import { Button, useTheme } from '@mui/material';

export default function Shop() {
  // todo pass these through as props, for now we use non-prod due to CORS
  const baseUrl = config.nonProdBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");
  

  const items = [ // todo add more + images
    {
      name: "Drone",
      value: "89.99"
    },
    {
      name: "Pizza",
      value: "19.99"
    },
  ]

  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          width: '100%'
        }}>
        <h1>Shop</h1>
      <Grid container spacing={3}>
        {items.map((item) => <Item key={item.name} baseUrl={baseUrl} apiKey={apiKey} secretKey={secretKey} name={item.name} value={item.value} />)}
      </Grid>
    </Box>
  )
}

function Item(props) {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: theme.palette.secondary.main,
        }}>
        <img alt={props.name + " product photo"} src={ "../products/" + props.name.toLowerCase() + ".jpeg" } />
        <p><b>{props.name}</b></p>
        <p>£{props.value}</p>
        <Button sx={{color: theme.palette.text.main}} onClick={() => buy(props.baseUrl, props.apiKey, props.secretKey)}>One-click Buy</Button>
      </Paper>
    </Grid>
  )
} 

function buy(baseUrl, apiKey, secretKey) {
  const url = baseUrl + "/checkouts";
  console.log(url)

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
           "successUrl": "https://demo.fiserv.dev/shop?success=true",
           "failureUrl": "https://demo.fiserv.dev/shop?success=false"
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
    (options) => fetch(url, options)
        .then(results => results.json())
        .then(data => window.location.href = data.checkout.redirectionUrl)
        .catch(rejected => console.log("Failed!", rejected)));
}


