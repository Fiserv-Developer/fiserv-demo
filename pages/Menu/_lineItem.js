import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
export const LineItem = ({pageName, icon}) => {
    return (
      <ListItemButton>
        <ListItemIcon>
        {icon}
        </ListItemIcon>
      <ListItemText primary={pageName} />
    </ListItemButton>
    )
  }
  