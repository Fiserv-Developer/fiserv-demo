import * as React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { LineItem } from './_lineItem';


export const mainListItems = (
  <React.Fragment>
    <LineItem pageName="Example 1" icon={<ShoppingCartIcon/>} />
    <LineItem pageName="Example 2" icon={<BarChartIcon/>} />
  </React.Fragment>
);

