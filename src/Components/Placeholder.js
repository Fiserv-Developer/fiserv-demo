import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Typography } from '@mui/material';
import { CenteredBox } from './CenteredBox';

export default function Placeholder() {
  const theme = useTheme();
  return (
    <React.Fragment>
      <CenteredBox>
        <CircularProgress sx={{fontSize: '8em', color: theme.palette.text.secondary}} />
        <Typography sx={{ color: theme.palette.text.secondary, fontStyle: 'italic', fontWeight: 'bold' }}>Loading...</Typography>
      </CenteredBox>
    </React.Fragment>
  );
}