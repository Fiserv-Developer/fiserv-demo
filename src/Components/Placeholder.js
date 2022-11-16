import React from 'react'
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { Box, Typography } from '@mui/material';

export default function Placeholder() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box style={{ textAlign: 'center', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
        <Box style={{display: 'block'}}>
          <CircularProgress style={{fontSize: '8em', color: theme.palette.text.faded}} />
          <Typography style={{ color: theme.palette.text.faded, fontStyle: 'italic', fontWeight: 'bold' }}>Loading...</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}