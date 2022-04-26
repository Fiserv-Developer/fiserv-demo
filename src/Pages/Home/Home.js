import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'; 
import Container from '@mui/material/Container';

export default function Home() {
  const localApiKey = "apiKey";
  const [apiKey, setApiKey] = useState(() => {
    const jsonValue = localStorage.getItem(localApiKey);
    return JSON.parse(jsonValue);
  });

  useEffect(() => {
    localStorage.setItem(localApiKey, JSON.stringify(apiKey));
  }, [apiKey]);

  return (
    <Container>
      <TextField id="apiKey" label="Api Key" variant="outlined" value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
    </Container>
  )
}
