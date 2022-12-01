import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import { Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import React from 'react';
import BodyElement from '../Components/BodyElement';
import { Title } from '../Components/Title';

export default function Home() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <Title icon={<HomeIcon />} primary="Home" secondary="The fiserv.dev integration demo landing page" />
      </BodyElement>

      <BodyElement xs={12}>
        <Typography variant="p" sx={{pb: '20px'}}>
          Welcome to the Fiserv EMEA Developer Platform Demo, designed to showcase usages of our APIs 
          and integration products available at <Link href="https://fiserv.dev"> https://fiserv.dev</Link>.
        </Typography>
        <Typography variant="p" sx={{pb: '20px'}}>For <b>developers</b>, the code for this demo is open source and can be found on <Link href="https://github.com/Fiserv-Developer/fiserv-demo">GitHub</Link>.</Typography>
        <Typography variant="p" sx={{pb: '20px'}}>For those wanting to <b>use the demo</b>, we recommend first <b>configuring</b> your demo experience:</Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => window.location = "/settings" }>
              <ListItemIcon>
                <SettingsIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Settings" secondary="Enter your API credentials and prepare any custom demo configuration" />
            </ListItemButton>
          </ListItem>
        </List>
      </BodyElement>

      <BodyElement xs={12}>
        <Typography variant="p" sx={{pb: '20px'}}>Once configured, see one of the following <b>demos</b>:</Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => window.location = "/dashboard" }>
              <ListItemIcon>
                <DashboardIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" secondary="An example merchant dashboard using our Transactional Data and Statements APIs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => window.location = "/shop" }>
              <ListItemIcon>
                <ShoppingBasket sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Shop" secondary="An example ecommerce store using our Checkouts API" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => window.location = "/shop" }>
              <ListItemIcon>
                <ReceiptIcon sx={{ color: theme.palette.primary.main }} />
              </ListItemIcon>
              <ListItemText primary="Invoices" secondary="An example invoice management suite using our Payment Links API" />
            </ListItemButton>
          </ListItem>
        </List>
      </BodyElement>
    </React.Fragment>
  );
}