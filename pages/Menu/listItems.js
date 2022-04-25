import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';


const LineItem = ({pageName, icon}) => {
  return (
    <ListItemButton>
      <ListItemIcon>
      {icon}
      </ListItemIcon>
    <ListItemText primary={pageName} />
  </ListItemButton>
  )
}

export const mainListItems = (
  <React.Fragment>
    <LineItem pageName="Example 1" icon={<ShoppingCartIcon/>} />
    <LineItem pageName="Example 2" icon={<BarChartIcon/>} />
  </React.Fragment>
);

