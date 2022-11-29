import { Typography } from '@mui/material';
import React from 'react'
import Placeholder from '../Components/Placeholder';

export default function Terminals(props) { 
  return (
    <React.Fragment>
      <Typography component="p" variant="h6" gutterBottom>
        <i>Note that this currently not yet implemented</i>
      </Typography>
      <Placeholder />
    </React.Fragment>
  );
}
