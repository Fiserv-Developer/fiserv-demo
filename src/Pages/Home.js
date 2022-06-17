import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'; 
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  console.log("Home:", theme.palette.text.main);
  const localApiKey = "apiKey";
  const [apiKey, setApiKey] = useState(() => {
    const apiKey = localStorage.getItem(localApiKey);
    if (apiKey) {
      return apiKey;
    } else {
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem(localApiKey, apiKey);
  }, [apiKey]);

  return (
    <Container color={theme.palette.text.main}>
      <TextField 
        id="apiKey" 
        label="Api Key" 
        variant="outlined" 
        value={apiKey} 
        onChange={(e) => setApiKey(e.target.value)}
        InputProps={{style: {color: theme.palette.text.main, textAlign: 'center'}}}
        InputLabelProps={{style: {color: theme.palette.text.main}}}/>
    </Container>
  );
}