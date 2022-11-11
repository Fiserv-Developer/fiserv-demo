import React from 'react'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
 
  return (
    <Box color={theme.palette.text.main} sx={{ display: 'block', width: '100%'}}>
      <h1>Home</h1>
      <p>Welcome to Project Cross, a demo solution brought to you by the Fiserv EMEA Developer Portal.</p>
      <p>Head over to the <a href="/settings">Settings</a> page to configure your demo.</p>
      <p>Once you've configured your demo experience, you can go to either of the following demos:</p>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
    </Box>
  );
}