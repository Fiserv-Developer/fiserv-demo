import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react'
import Placeholder from '../Components/Dashboard/Placeholder';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Terminals() {
  const theme = useTheme();
  // todo pass these in as state props
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [merchantId, setMerchantId] = useState(() => getValueOrDefault(config.merchantId, ""));

  return (
    <React.Fragment>
      <Typography component="p" variant="h6" color={theme.palette.text.main} gutterBottom>
        <i>Note that this currently not yet implemented</i>
      </Typography>
      <Placeholder />
    </React.Fragment>
  );
}
