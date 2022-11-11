import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import routes from '../Config/routes'
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Menu(props) {
  const { window } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonBackground = (isActive) => {
    return isActive ? { background: theme.palette.orange.main } : { background: 'transparent' };
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <MuiAppBar
        position="fixed"
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: theme.palette.inverse.main,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <img alt='Fiserv developer logo' src='../logo-dark.svg' height="40px" />
        </Toolbar>
      </MuiAppBar>
      <Box>
      <MuiDrawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        <List>
          {routes.map((route, index) => {
            return (
              <NavLink key={index} to={route.url} style={({ isActive }) => handleButtonBackground(isActive)}>
                <ListItem button sx={{paddingLeft: '20px', background: 'inherit'}} onClick={handleMobileDrawerToggle}>
                  <ListItemIcon sx={{ color: 'var(--white)' }}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.name} sx={{ color: 'var(--white)', textDecoration: 'none' }} />
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </MuiDrawer>
      <Drawer theme={theme} variant="permanent" open={open} sx={{display: { xs: 'none', sm: 'block' }}}>
        <br />
        <Divider />
        <List>
            {routes.map((route, index) => {
              return (
                <NavLink key={index} to={route.url} style={({ isActive }) => handleButtonBackground(isActive)}>
                  <ListItem button sx={{paddingLeft: '20px', background: 'inherit'}}>
                    <ListItemIcon sx={{ color: 'var(--white)' }}>
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.name} sx={{ color: 'var(--white)', textDecoration: 'none' }} />
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        <Divider />
        <IconButton sx={{ color: theme.palette.primary.main }} 
          onClick={() => handleDrawerToggle()}>
          {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
        </IconButton>
        <br /><br/>
        <img alt='Fiserv developer logo' src='../logo-dark.svg' width='80%' style={{position: 'absolute', left: '10%', bottom: '20px'}} />
        <br /><br />
        <Divider />
      </Drawer>
      </Box>
    </React.Fragment>
  );
}