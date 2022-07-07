import React from 'react'
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';

export default function Home() {
  const theme = useTheme();
 
  return (
    <Container background={theme.palette.primary.main} color={theme.palette.text.main}>
      <p>Welcome to Project Cross, a demo solution brought to you by the Fiserv EMEA Developer Portal.</p>
      <p>Head over to the <a href="/settings">Settings</a> page to configure your demo.</p>
      <p>Once you've configured your demo experience, you can go to either of the following demos:</p>
      <ul>
        <li><a href="/portal">Portal</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
    </Container>
  );
}