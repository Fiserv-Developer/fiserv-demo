import { Box } from '@mui/material';
import React from 'react'
import DashboardGrid from '../Components/Dashboard/DashboardGrid';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Dashboard() {
  // todo pass these in as state props?
  const apiKey = getValueOrDefault(config.apiKey, "");
  const merchantId = getValueOrDefault(config.merchantId, "");

  return (
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          width: '100%'
        }}>
      <h1>Dashboard</h1>
      <DashboardGrid apiKey={apiKey} merchantId={merchantId} />
    </Box>
  );
}
