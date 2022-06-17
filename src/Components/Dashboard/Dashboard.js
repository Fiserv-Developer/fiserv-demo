import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Authorisations from './Authorisations';
import Transactions from './Transactions';
import Fundings from './Fundings';

export default function Dashboard(props) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.primary.main }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <Authorisations apiKey={props.apiKey} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                <Fundings apiKey={props.apiKey} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 
                  'flex', 
                  flexDirection: 'column', 
                  backgroundColor: theme.palette.secondary.main, 
                }}>
                <Transactions apiKey={props.apiKey} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}