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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
    backgroundColor: theme.palette.menu.background,
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
  const icon = !props.themeToggle ? <WbSunnyIcon /> : <DarkModeIcon />

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonBackground = (isActive) => {
    return isActive ? { background: theme.palette.primary.main } : { background: 'transparent' };
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
          backgroundColor: theme.palette.menu.background,
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
        {/* Mobile drawer (temporary) */}
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
            '& .MuiDrawer-paperAnchorLeft': { backgroundColor: theme.palette.menu.background + ' !important'}
          }}>
            <br />
            <img alt='Fiserv developer logo' src='../logo-dark.svg' width='80%' style={{margin: '0 auto'}} />
            <br />
            <Divider />
            <List>
              {routes.map((route, index) => {
                if (route.type === 'component') {
                  return (
                  <NavLink key={index} to={route.url} style={({ isActive }) => handleButtonBackground(isActive)}>
                    <ListItem button sx={{paddingLeft: '20px', background: 'inherit'}} onClick={handleMobileDrawerToggle}>
                      <ListItemIcon sx={{ color: theme.palette.menu.text }}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText primary={route.name} sx={{ color: theme.palette.menu.text, textDecoration: 'none' }} />
                    </ListItem>
                  </NavLink>
                );
              } else {
                return (null); // don't show any non-component links
              }
              })}
            </List>
        </MuiDrawer>

        {/* Desktop drawer (permanent) */}
        <Drawer theme={theme} variant="permanent" open={open} 
          sx={{
            display: { xs: 'none', sm: 'block',
            '& .MuiDrawer-paperAnchorLeft': { backgroundColor: theme.palette.menu.main + ' !important'}
          }}}
        >
          <br />
          <a href="https://fiserv.dev" target="_blank" rel="noreferrer noopener" style={{width: '100%', textAlign: 'center'}}>
            <img alt='Fiserv developer logo' src='../logo-dark.svg'  style={{width: '80%'}} />
          </a>
          <br />
          <Divider sx={{ borderColor: theme.palette.menu.line }} />
          <List>
              {routes.map((route, index) => {
                if (route.type === 'component') {
                  return (
                    <NavLink key={index} to={route.url} style={({ isActive }) => handleButtonBackground(isActive)}>
                      <ListItem button sx={{
                        paddingLeft: '20px', 
                        background: 'inherit !important', 
                        '&:hover': { background: theme.palette.primary.light + ' !important' }
                      }}>
                        <ListItemIcon sx={{color: theme.palette.menu.text }}>
                          {route.icon}
                        </ListItemIcon>
                        <ListItemText primary={route.name} sx={{ textDecoration: 'none', color: theme.palette.menu.text }} />
                      </ListItem>
                    </NavLink>
                  );
                } else {
                  return (null); // don't show any non-component links
                }
              })}
            </List>
          <Divider sx={{ borderColor: theme.palette.menu.line }} />
          <br />
          <IconButton 
            sx={{ color: theme.palette.menu.text }} 
            onClick={() => handleDrawerToggle()}>
            {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
          </IconButton>
          <br /><br/>

          <Box sx={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="mode"
              onClick={() => {
                props.setThemeToggle(!props.themeToggle);
              }}
              sx={{ color: theme.palette.primary.main, margin: 0}}>
                {icon}
            </IconButton>
          </Box>         
          <br /><br />
        </Drawer>
      </Box>
    </React.Fragment>
  );
}