import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


  export default function LineItem(props) {

        return (
            <ListItemButton>
              <ListItemIcon>
              {props.icon}
              </ListItemIcon>
            <ListItemText primary={props.pageName} />
          </ListItemButton>
          )
   
  }

