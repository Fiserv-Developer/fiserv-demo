import { Grid } from '@mui/material';
import React from 'react'
import BodyElement from '../Components/BodyElement';
import Authorisations from '../Components/Dashboard/Authorisations';
import Fees from '../Components/Dashboard/Fees';
import Fundings from '../Components/Dashboard/Fundings';
import Statements from '../Components/Dashboard/Statements';
import Transactions from '../Components/Dashboard/Transactions';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Title } from '../Components/Title';

export default function Dashboard() {
  const apiKey = getValueOrDefault(config.apiKey, "");
  const merchantId = getValueOrDefault(config.merchantId, "");

  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <Title icon={<DashboardIcon />} primary="Dashboard" secondary="View your merchant transactional data or download recent statements" />
      </BodyElement>
    
      {/* Fundings */}
      <Grid container item xs={12} md={8} lg={8} direction="row" spacing={3}>
        <BodyElement xs={12} md={12} lg={12}>
          <Authorisations apiKey={apiKey} merchantId={merchantId} />
        </BodyElement>
        <BodyElement xs={12} md={6} lg={6}>
          <Fundings apiKey={apiKey} merchantId={merchantId} />
        </BodyElement>
        <BodyElement xs={12} md={6} lg={6}>
          <Fees apiKey={apiKey} merchantId={merchantId} />
        </BodyElement>
      </Grid>

      {/* Statements */}
      <BodyElement xs={12} md={4} lg={4}>
        <Statements apiKey={apiKey} merchantId={merchantId} />
      </BodyElement>

      {/* Transactions */}
      <BodyElement xs={12}>
        <Transactions apiKey={apiKey} merchantId={merchantId} />
      </BodyElement>
    </React.Fragment>
  );
}
