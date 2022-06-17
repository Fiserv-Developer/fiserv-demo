import * as React from 'react'
import {
  IconButton,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
  Typography
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation } from 'react-router-dom'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import routes from '../Config/routes'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function Header(props) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const icon = !props.theme ? <WbSunnyIcon /> : <DarkModeIcon />

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const location = useLocation()
  const getPageTitle = () => {
    let pageName = ''
    routes.filter(value => {
      if (value.url === location.pathname) {
        pageName = value.name
      }
      return value
    })
    return pageName
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        open={open}
        sx={{
          backgroundColor: 'var(--bg)',
          zIndex: theme => theme.zIndex.drawer + 1,
          height: '81px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h4'
            component='p'
            sx={{ fontSize: '18px', fontWeight: '600', color: 'var(--white)' }}
          >
            {getPageTitle(location.pathname)}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={() => {
              props.setTheme(!props.theme);
            }}
            sx={{ position: 'fixed', right: '10px', color: theme.palette.text.main}}>
              {icon}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader
          sx={{
            backgroundColor: 'var(--bg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '81px'
          }}
        >
          <img alt='Fiserv developer logo' src='../logo.svg' width='80%' />

          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: 'var(--white)' }}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {routes.map((value, index) => {
              if (value.type === 'component') {
                return (
                  <Link
                    key={index}
                    to={value.url}
                    onClick={() => setOpen(false)}
                  >
                    <ListItem button>
                      <ListItemIcon sx={{ color: 'var(--white)' }}>
                        {value.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={value.name}
                        sx={{ color: 'var(--white)', textDecoration: 'none' }}
                      />
                    </ListItem>
                  </Link>
                )
              } else {
                return (
                  <Link
                    key={index}
                    to={value.url}
                    onClick={() => (window.location = value.url)}
                  >
                    <ListItem button>
                      <ListItemIcon sx={{ color: 'var(--white)' }}>
                        {value.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: 'var(--white)', textDecoration: 'none' }}
                        primary={value.name}
                      />
                    </ListItem>
                  </Link>
                )
              }
            })}
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  )
}
