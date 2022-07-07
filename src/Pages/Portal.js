import React, { useState } from 'react'
import Dashboard from '../Components/Dashboard/Dashboard';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Portal() {
  // todo pass these in as state props
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [merchantId, setMerchantId] = useState(() => getValueOrDefault(config.merchantId, ""));

  return (
    <React.Fragment>
      <Dashboard apiKey={apiKey} merchantId={merchantId} />
    </React.Fragment>
  );
}
