import WarningIcon from '@mui/icons-material/Warning';
import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import { CenteredBox } from './CenteredBox';

export default function Error() {
  return (
    <CenteredBox>
      <WarningIcon style={{ fontSize: '4em', margin: '0 auto', }}/>
      <Typography gutterBottom component="p" variant="h6" 
        style={{
          margin: '0 auto',
        }}>
        Error processing your request, please check your settings and try again
      </Typography>
      <Link to="/settings" style={ {margin: '0 auto', marginBottom: '1em', }}>
        <Button>Go to Settings</Button>
      </Link>
    </CenteredBox>
  );
}
          