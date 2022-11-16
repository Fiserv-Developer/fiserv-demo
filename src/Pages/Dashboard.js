import React from 'react'
import BodyElement from '../Components/BodyElement';
import Authorisations from '../Components/Dashboard/Authorisations';
import Fundings from '../Components/Dashboard/Fundings';
import Statements from '../Components/Dashboard/Statements';
import Transactions from '../Components/Dashboard/Transactions';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Dashboard() {
  // todo pass these in as state props?
  const apiKey = getValueOrDefault(config.apiKey, "");
  const merchantId = getValueOrDefault(config.merchantId, "");

  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <h1>Dashboard</h1>
        <p>Welcome to the merchant dashboard, it contains demo integrations for viewing merchant transactional data and statements.</p>
      </BodyElement>

      {/* Authorisations */}
      <BodyElement xs={12} md={4} lg={4}>
        <Authorisations apiKey={apiKey} merchantId={merchantId} />
      </BodyElement>
    
      {/* Fundings */}
      <BodyElement xs={12} md={4} lg={4}>
        <Fundings apiKey={apiKey} merchantId={merchantId} />
      </BodyElement>

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
