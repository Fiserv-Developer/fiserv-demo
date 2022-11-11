import React from 'react'
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { Box } from '@mui/material';

export default function Placeholder() {
  const theme = useTheme();
  return (
    <Box style={{ textAlign: 'center', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress style={{fontSize: '8em', color: theme.palette.text.faded}} />
    </Box>
  );
}