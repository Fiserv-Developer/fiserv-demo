import { Alert, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BodyElement from '../Components/BodyElement';
import KeyFormControl from '../Components/Settings/KeyFormControl';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Settings() {
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [secretKey, setSecretKey] = useState(() => getValueOrDefault(config.secretKey, ""));
  const [nonProdApiKey, setNonProdApiKey] = useState(() => getValueOrDefault(config.nonProdApiKey, ""));
  const [nonProdSecretKey, setNonProdSecretKey] = useState(() => getValueOrDefault(config.nonProdSecretKey, ""));
  const [paymentIntegration, setPaymentIntegration] = useState(() => getValueOrDefault(config.paymentIntegration, ""));
  const [merchantId, setMerchantId] = useState(() => getValueOrDefault(config.merchantId, ""));
  const [open, setOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    apiKey: false,
    secretKey: false,
    nonProdApiKey: false,
    nonProdSecretKey: false,
  })

  useEffect(() => {
    updateConfig(config.apiKey, apiKey);
  }, [apiKey]);

  useEffect(() => {
    updateConfig(config.secretKey, secretKey);
  }, [secretKey]);

  useEffect(() => {
    updateConfig(config.nonProdApiKey, nonProdApiKey);
  }, [nonProdApiKey]);

  useEffect(() => {
    updateConfig(config.nonProdSecretKey, nonProdSecretKey);
  }, [nonProdSecretKey]);

  useEffect(() => {
    updateConfig(config.paymentIntegration, paymentIntegration);
  }, [paymentIntegration]);

  useEffect(() => {
    updateConfig(config.merchantId, merchantId)
  }, [merchantId]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hideUpdate();
  };

  const togglePasswordVisibility = (field) => {
    const updated = {
      ...passwords
    }
    updated[field] = !updated[field];
    setPasswords(updated);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function updateConfig(keyName, value) {
    localStorage.setItem(keyName, value);
  }

  function showUpdate() {
    setOpen(true);
  }

  function hideUpdate() {
    setOpen(false);
  }


  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <h1>Settings</h1>
        <p>
          <i>This page contains all of your demo configuration, make sure you review all fields to tailor the best demo experience.</i>        
        </p>
        <p>
          <i><b>Changes to this configuration are saved and applied automatically.</b></i>
        </p>
      </BodyElement>

      <BodyElement xs={12} md={6}>
        <h2>Sandbox Authentication</h2>
        <p>
          You <strong>API Key</strong> and <strong>Secret Key</strong> can be found via our <a href="https://portal.fiserv.dev">portal</a>, 
          make sure to use <strong>Sandbox</strong> keys!
        </p>

        <KeyFormControl 
          label="API Key" 
          display={passwords.apiKey} 
          value={apiKey} 
          onChange={(value) => { showUpdate(); setApiKey(value)}}
          onClick={() => togglePasswordVisibility("apiKey")}
          onMouseDown={handleMouseDownPassword}
        />

        <KeyFormControl 
          label="Secret Key" 
          display={passwords.secretKey} 
          value={secretKey} 
          onChange={(value) => { showUpdate(); setSecretKey(value)}}
          onClick={() => togglePasswordVisibility("secretKey")}
          onMouseDown={handleMouseDownPassword}
        />
      </BodyElement>
      
      <BodyElement xs={12} md={6}>
        <h2>Non-prod Sandbox Authentication</h2>
        <p>
          For testing anything in <b>non-prod</b>, such as an api in development, you will need to use different credentials...
        </p>

        <KeyFormControl 
          label="Non-prod API Key" 
          display={passwords.nonProdApiKey} 
          value={nonProdApiKey} 
          onChange={(value) => { showUpdate(); setNonProdApiKey(value)}}
          onClick={() => togglePasswordVisibility("nonProdApiKey")}
          onMouseDown={handleMouseDownPassword}
        />

        <KeyFormControl 
          label="Non-prod Secret Key" 
          display={passwords.nonProdSecretKey} 
          value={nonProdSecretKey} 
          onChange={(value) => { showUpdate(); setNonProdSecretKey(value)}}
          onClick={() => togglePasswordVisibility("nonProdSecretKey")}
          onMouseDown={handleMouseDownPassword}
        />
      </BodyElement>

      <BodyElement xs={12}>
        <h2>Dashboard</h2>
        <p>
          If you want to configure your experience for a specific merchant, you can set the ID here.
        </p>
        <Select
          labelId="merchantId-label"
          id="merchantId"
          value={merchantId}
          label="Merchant ID"
          onChange={(e) => { showUpdate(); setMerchantId(e.target.value) }}>
          <MenuItem value="">ALL</MenuItem>
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
          onChange={(e) => { showUpdate(); setPaymentIntegration(e.target.value) }}>
          <FormControlLabel value="paymentsApi" control={<Radio />} label="Payments API" />
          <FormControlLabel value="hostedPaymentPage" control={<Radio />} label="Hosted Payments Page" />
        </RadioGroup>
      </BodyElement>
      
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Settings saved!
          </Alert>
      </Snackbar>
    </React.Fragment>
  );
}