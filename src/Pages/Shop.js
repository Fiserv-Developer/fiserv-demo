import React, { useState } from 'react'
import Container from '@mui/material/Container';
import moment from 'moment-timezone';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { getValueOrDefault } from '../Config/utils';
import { config } from '../Config/constants';

export default function Shop(props) {

  // todo pass these through as props
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [secretKey, setSecretKey] = useState(() => getValueOrDefault(config.secretKey, ""));
  const [paymentIntegration, setPaymentIntegration] = useState(() => getValueOrDefault(config.paymentIntegration, ""));

  // actual constants
  const separator = "|";

  // fixed constants - todo consider adding to config screen for this section
  const url = "https://test.ipg-online.com/connect/gateway/processing";
  const currency = "826";
  const hash_algorithm = "HMACSHA256";
  const language = "en_GB";
  const paymentMethod = "V";
  const responseFailURL = "https://test.ipg-online.com/webshop/response_failure.jsp";
  const responseSuccessURL = "https://test.ipg-online.com/webshop/response_success.jsp";
  const storename = "72305408";
  const timezone = "Europe/London";
  const transactionNotificationURL = "https://mywebshop/transactionNotification";
  const txntype = "sale";

  // item constants - todo make these dynamic per item
  const chargetotal = "13.00";

  // state calculated on event
  const [txndatetime, setTxndatetime] = useState(moment().tz(timezone).format('YYYY:MM:DD-HH:mm:ss'));
  const [hashExtended, setHashExtended] = useState("");

  const updateTimestamp = () => {
    setTxndatetime(moment().tz(timezone).format('YYYY:MM:DD-HH:mm:ss'));
  };

  const handleSubmit = (event) => {
    if(paymentIntegration === "hostedPaymentPage") {
      console.log("Processing with the hosted payment page");
      updateTimestamp();

      const values = [
        chargetotal, 
        currency, 
        paymentMethod, 
        responseFailURL, 
        responseSuccessURL, 
        storename, 
        timezone, 
        transactionNotificationURL, 
        txndatetime, 
        txntype
      ];
      const messageSignatureString = values.join(separator);

      const messageSignature = CryptoJS.HmacSHA256(messageSignatureString, secretKey);
      const messageSignatureBase64 = CryptoJS.enc.Base64.stringify(messageSignature);
      setHashExtended(messageSignatureBase64);
      document.getElementById("paymentForm").submit();

    } else if (paymentIntegration === "paymentsApi") {
      console.log("Processing with the payments api");
      buy(apiKey, secretKey);

    } else {
      console.log("Integration method not configured, check settings.")
    }
  };

  return (
    <Container>
      <form id="paymentForm" method="post" action={url} target="_blank">
        <input type="text" name="chargetotal" value={chargetotal} readOnly />
        <input type="hidden" name="currency" value={currency} readOnly />
        <input type="hidden" name="hash_algorithm" value={hash_algorithm} readOnly />
        <input type="hidden" name="hashExtended" value={hashExtended} readOnly />
        <input type="hidden" name="language" value={language} readOnly />
        <input type="hidden" name="paymentMethod" value={paymentMethod} readOnly />
        <input type="hidden" name="responseFailURL" value={responseFailURL} readOnly />
        <input type="hidden" name="responseSuccessURL" value={responseSuccessURL} readOnly />
        <input type="hidden" name="storename" value={storename} readOnly />
        <input type="hidden" name="timezone" value={timezone} readOnly />
        <input type="hidden" name="transactionNotificationURL" value={transactionNotificationURL} readOnly />
        <input type="hidden" name="txndatetime" value={txndatetime} readOnly />
        <input type="hidden" name="txntype" value={txntype} readOnly />
        <input type="button" value="Buy" onClick={handleSubmit} />
      </form>
    </Container>
  )
}

function buy(apiKey, secretKey) {
  const url = "https://prod.emea.api.fiservapps.com/sandbox/ipp/payments-gateway/v2/payments/";

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
    {
      requestType: "PaymentCardSaleTransaction",
      transactionAmount: { total: "13", currency: "GBP" },
      paymentMethod: {
        paymentCard: {
          number: "1234561234561234",
          securityCode: "123",
          expiryDate: { month: "02", year: "22" },
        }
      }
    },
    (options) => fetch(url, options)
        .then(results => results.json())
        .then(data => console.log("success!", data))
        .catch(rejected => console.log("Failed!", rejected)));
}


