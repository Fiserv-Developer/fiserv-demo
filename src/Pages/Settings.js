import React, { useState, useEffect } from 'react'
import { Snackbar, Alert, Box } from '@mui/material';
import { FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select, useTheme } from '@mui/material';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Settings() {
  const theme = useTheme();

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

  // handles the first initialisation of local storage and state
  // when it detects an 'update', triggers the update notification
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
    <Box color={theme.palette.text.main} sx={{ display: 'flex', width: '100%'}}>
      <FormControl>
        <h1>Settings</h1>
        <p>
          <i>This page contains all of your demo configuration, make sure you review all fields to tailor the best demo experience.</i>        
        </p>
        <p>
          <i><b>Changes to this configuration are saved and applied automatically.</b></i>
        </p>
        <h2>Authentication</h2>
        <p>
          You <strong>API Key</strong> and <strong>Secret Key</strong> can be found via our <a href="https://portal.fiserv.dev">portal</a>, 
          make sure to use <strong>Sandbox</strong> keys!
        </p>

        <FormControl sx={{ color: theme.palette.text.main, textAlign: 'center', marginBottom: "20px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">API Key</InputLabel>
          <OutlinedInput
            type={passwords.apiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => { showUpdate(); setApiKey(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePasswordVisibility("apiKey")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwords.apiKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="API Key"
          />
        </FormControl>

        <FormControl sx={{ color: theme.palette.text.main, textAlign: 'center', marginBottom: "20px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Secret Key</InputLabel>
          <OutlinedInput
            type={passwords.secretKey ? 'text' : 'password'}
            value={secretKey}
            onChange={(e) => { showUpdate(); setSecretKey(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePasswordVisibility("secretKey")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwords.secretKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Secret Key"
          />
        </FormControl>
        
        <p>
          For testing anything in <b>non-prod</b>, you will need to use different credentials...
        </p>
        
        <FormControl sx={{ color: theme.palette.text.main, textAlign: 'center', marginBottom: "20px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Non-prod API Key</InputLabel>
          <OutlinedInput
            type={passwords.nonProdApiKey ? 'text' : 'password'}
            value={nonProdApiKey}
            onChange={(e) => { showUpdate(); setNonProdApiKey(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePasswordVisibility("nonProdApiKey")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwords.nonProdApiKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Non-prod API Key"
          />
        </FormControl>

        <FormControl sx={{ color: theme.palette.text.main, textAlign: 'center', marginBottom: "20px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Non-prod Secret Key</InputLabel>
          <OutlinedInput
            type={passwords.nonProdSecretKey ? 'text' : 'password'}
            value={nonProdSecretKey}
            onChange={(e) => { showUpdate(); setNonProdSecretKey(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePasswordVisibility("nonProdSecretKey")}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passwords.nonProdSecretKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Non-prod Secret Key"
          />
        </FormControl>

        <h2>Portal</h2>
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
      </FormControl>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Settings saved!
          </Alert>
      </Snackbar>
    </Box>
  );
}