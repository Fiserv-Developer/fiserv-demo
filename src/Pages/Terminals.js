import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react'
import Placeholder from '../Components/Placeholder';

export default function Terminals(props) {
  const theme = useTheme();
  
  return (
    <React.Fragment>
      <Typography component="p" variant="h6" color={theme.palette.text.main} gutterBottom>
        <i>Note that this currently not yet implemented</i>
      </Typography>
      <Placeholder />
    </React.Fragment>
  );
}
