import { Alert, Link, MenuItem, Select, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BodyElement from '../Components/BodyElement';
import KeyFormControl from '../Components/Settings/KeyFormControl';
import { Title } from '../Components/Title';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Settings() {
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [secretKey, setSecretKey] = useState(() => getValueOrDefault(config.secretKey, ""));
  const [nonProdApiKey, setNonProdApiKey] = useState(() => getValueOrDefault(config.nonProdApiKey, ""));
  const [nonProdSecretKey, setNonProdSecretKey] = useState(() => getValueOrDefault(config.nonProdSecretKey, ""));
  const [merchantId, setMerchantId] = useState(() => getValueOrDefault(config.merchantId, ""));
  const [open, setOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    apiKey: false,
    secretKey: false,
    nonProdApiKey: false,
    nonProdSecretKey: false,
  });

  useEffect(() => updateConfig(config.apiKey, apiKey), [apiKey]);
  useEffect(() => updateConfig(config.secretKey, secretKey), [secretKey]);
  useEffect(() => updateConfig(config.nonProdApiKey, nonProdApiKey), [nonProdApiKey]);
  useEffect(() => updateConfig(config.nonProdSecretKey, nonProdSecretKey), [nonProdSecretKey]);
  useEffect(() => updateConfig(config.merchantId, merchantId), [merchantId]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hideUpdate();
  };

  const togglePasswordVisibility = (field) => {
    const updated = {
      ...passwords
    };
    updated[field] = !updated[field];
    setPasswords(updated);
  };

  const onSettingChange = (value, updateState) => {
    showUpdate();
    updateState(value);
  }

  const handleMouseDownPassword = (event) => event.preventDefault();

  const updateConfig = (keyName, value) => localStorage.setItem(keyName, value);

  const showUpdate = () => setOpen(true);

  const hideUpdate = () => setOpen(false);

  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <Title icon={<SettingsIcon />} primary="Settings" secondary="Configure the demo with your API credentials and tailor your experience"  />
      </BodyElement>

      <BodyElement xs={12} md={6}>
        <h2>Sandbox Authentication</h2>
        <p>
          Your <strong>API Key</strong> and <strong>Secret Key</strong> can be found via our <Link href="https://portal.fiserv.dev">portal</Link>, 
          make sure to use <strong>Sandbox</strong> keys and <i>not</i> production!
        </p>

        <KeyFormControl 
          label="API Key" 
          display={passwords.apiKey} 
          value={apiKey} 
          onChange={(value) => onSettingChange(value, setApiKey) }
          onClick={() => togglePasswordVisibility("apiKey")}
          onMouseDown={handleMouseDownPassword}/>

        <KeyFormControl 
          label="Secret Key" 
          display={passwords.secretKey} 
          value={secretKey} 
          onChange={(value) => onSettingChange(value, setSecretKey) }
          onClick={() => togglePasswordVisibility("secretKey")}
          onMouseDown={handleMouseDownPassword}/>
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
          onChange={(value) => onSettingChange(value, setNonProdApiKey) }
          onClick={() => togglePasswordVisibility("nonProdApiKey")}
          onMouseDown={handleMouseDownPassword}/>

        <KeyFormControl 
          label="Non-prod Secret Key" 
          display={passwords.nonProdSecretKey} 
          value={nonProdSecretKey} 
          onChange={(value) => onSettingChange(value, setNonProdSecretKey) }
          onClick={() => togglePasswordVisibility("nonProdSecretKey")}
          onMouseDown={handleMouseDownPassword}/>
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
          onChange={(e) => onSettingChange(e.target.value, setMerchantId) }
        >
          <MenuItem value="">ALL</MenuItem>
          <MenuItem value="60001">60001</MenuItem>
          <MenuItem value="60002">60002</MenuItem>
          <MenuItem value="60003">60003</MenuItem>
          <MenuItem value="60004">60004</MenuItem>
        </Select>
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