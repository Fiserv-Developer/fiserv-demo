import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Authorisations from './Authorisations';
import Transactions from './Transactions';
import Fundings from './Fundings';
import Statements from './Statements';

export default function DashboardGrid(props) {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      {/* Authorisations */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 260,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Authorisations apiKey={props.apiKey} merchantId={props.merchantId} />
        </Paper>
      </Grid>
      {/* Fundings */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 260,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Fundings apiKey={props.apiKey} merchantId={props.merchantId} />
        </Paper>
      </Grid>
      {/* Statements */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper 
          sx={{ 
            p: 2, 
            display: 'flex', 
            height: 260,
            flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.main, 
          }}>
          <Statements apiKey={props.apiKey} merchantId={props.merchantId} />
        </Paper>
      </Grid>
      {/* Transactions */}
      <Grid item xs={12}>
        <Paper 
          sx={{ 
            p: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.main, 
            height: '600px'
          }}>
          <Transactions apiKey={props.apiKey} merchantId={props.merchantId} />
        </Paper>
      </Grid>
    </Grid>
  );
}