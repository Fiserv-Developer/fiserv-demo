import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import BodyElement from '../Components/BodyElement';
import { Title } from '../Components/Title';

export default function Home() {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{padding: '30px'}}>
      <BodyElement xs={12}>
        <Title icon={<HomeIcon />} primary="Home" secondary="The fiserv.dev integration demo landing page" />
        <br />
        <Typography variant="p" sx={{pb: '20px'}}>
          Welcome to the Fiserv EMEA Developer Platform Demo, designed to showcase usages of our APIs 
          and integration products available at <Link href="https://fiserv.dev"> https://fiserv.dev</Link>.
        </Typography>
        <Typography variant="p" sx={{pb: '20px'}}>For <b>developers</b>, the code for this demo is open source and can be found on <Link href="https://github.com/Fiserv-Developer/fiserv-demo">GitHub</Link>.</Typography>
      </BodyElement>

      <BodyElement xs={12}>
        <Title icon={<SettingsIcon />} primary="Configuration" secondary="How to configure and tailor your demo experience" />
        <br />
        <Typography variant="p" sx={{pb: '20px'}}>
          For those wanting to use the demo, we recommend first configuring your 
          demo experience by providing your sandbox API credentials and customising the demo:
        </Typography>
        <List>
          <ListItem disablePadding>
            <RouterLink to="/settings">
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Settings" 
                  secondary="Enter your API credentials and prepare any custom demo configuration"
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </RouterLink>
          </ListItem>
        </List>
      </BodyElement>

      <BodyElement xs={12}>
        <Title icon={<SubscriptionsIcon />} primary="Demos" secondary="See one of the available demo products below" />
        <br />
        <List>
          <ListItem disablePadding>
            <RouterLink to="/dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Dashboard" 
                  secondary="An example merchant dashboard using our Transactional Data and Statements APIs" 
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </RouterLink>
          </ListItem>
          <ListItem disablePadding>
            <RouterLink to="/shop">
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBasket sx={{ color: theme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Shop" 
                  secondary="An example ecommerce store using our Checkouts API" 
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemButton>
            </RouterLink>
          </ListItem>
          <ListItem disablePadding>
          <RouterLink to="/invoices">
            <ListItemButton>
              <ListItemIcon>
                <ReceiptIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText 
                primary="Invoices" 
                secondary="An example invoice management suite using our Payment Links API" 
                sx={{ color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </RouterLink>
          </ListItem>
        </List>
      </BodyElement>
    </Grid>
  );
}