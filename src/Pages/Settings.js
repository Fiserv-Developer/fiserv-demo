import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'; 
import Container from '@mui/material/Container';
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, useTheme } from '@mui/material';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Settings() {
  const theme = useTheme();

  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [secretKey, setSecretKey] = useState(() => getValueOrDefault(config.secretKey, ""));
  const [paymentIntegration, setPaymentIntegration] = useState(() => getValueOrDefault(config.paymentIntegration, ""));
  const [merchantId, setMerchantId] = useState(() => getValueOrDefault(config.merchantId, ""));

  useEffect(() => localStorage.setItem(config.apiKey, apiKey), [apiKey]);
  useEffect(() => localStorage.setItem(config.secretKey, secretKey), [secretKey]);
  useEffect(() => localStorage.setItem(config.paymentIntegration, paymentIntegration), [paymentIntegration]);
  useEffect(() => localStorage.setItem(config.merchantId, merchantId), [merchantId]);

  return (
    <Container color={theme.palette.text.main}>
      <p>
        <i>This page contains all of your demo configuration, make sure you review all fields to tailor the best demo experience.</i>
      </p>
      <FormControl>
        <h2>Authentication</h2>
        <p>
          You <strong>API Key</strong> and <strong>Secret Key</strong> can be found via our <a href="https://portal.fiserv.dev">portal</a>, 
          make sure to use <strong>Sandbox</strong> keys!
        </p>
        <TextField 
          id="apiKey" 
          label="Api Key" 
          variant="outlined" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)}
          InputProps={{style: {color: theme.palette.text.main, textAlign: 'center', marginBottom: "20px"}}}
          InputLabelProps={{style: {color: theme.palette.text.main}}} />
        <TextField 
          id="secretKey" 
          label="Secret Key" 
          variant="outlined" 
          value={secretKey} 
          onChange={(e) => setSecretKey(e.target.value)}
          InputProps={{style: {color: theme.palette.text.main, textAlign: 'center'}}}
          InputLabelProps={{style: {color: theme.palette.text.main}}}/>

        <h2>Portal</h2>
        <p>
          If you want to configure your experience for a specific merchant, you can set the ID here.
        </p>
        <Select
          labelId="merchantId-label"
          id="merchantId"
          value={merchantId}
          label="Merchant ID"
          onChange={(e) => setMerchantId(e.target.value)}>
          <MenuItem value="60001">60001</MenuItem>
          <MenuItem value="60002">60002</MenuItem>
          <MenuItem value="60003">60003</MenuItem>
          <MenuItem value="60004">60004</MenuItem>
        </Select>

        <h2>Shop</h2>
        <p>
          You can configure the 'shop' demo to either use our Payment API or our Hosted Payment Page to see the difference.
        </p>
        <RadioGroup
          id="paymentIntegration"
          aria-labelledby="demo-radio-buttons-group-label"
          value={paymentIntegration} 
          name="radio-buttons-group"
          onChange={(e) => setPaymentIntegration(e.target.value)}>
          <FormControlLabel value="paymentsApi" control={<Radio />} label="Payments API" />
          <FormControlLabel value="hostedPaymentPage" control={<Radio />} label="Hosted Payments Page" />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}