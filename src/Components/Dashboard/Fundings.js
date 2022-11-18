import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Placeholder from '../Placeholder';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
var bigDecimal = require('js-big-decimal');

const zero = "0.00";

export default function Fundings(props) {
  const [net, setNet] = useState(zero);
  const [transactions, setTransactions] = useState(zero);
  const [fees, setFees] = useState(zero);
  const [error, setError] = useState(false);

  const today = new Date().toISOString().substring(0, 10);
  const lastWeekDate = new Date()
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  const zeroOut = () => {
    setNet(zero);
    setTransactions(zero);
    setFees(zero);
  };

  // get fundings
  useEffect(() => {
    setError(true);
    const url = config.baseUrl + '/fundings?sort=-funded&fundedAfter=' + today + '&fundedBefore=' + today;
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetchWithRetry(url, {
      method: 'GET',
      headers: headers,
    }).then(fundings => {
        zeroOut();

        // get all details and sum up the values
        fundings.forEach(funding => {
          const url = config.baseUrl + '/fundings/' + funding.id + "/details";
          fetchWithRetry(url, {
            method: 'GET',
            headers: {
              'Api-Key': props.apiKey,
              'Accept': 'application/json'
            }
          }).then(details => {
              const totals = calculateTotals(details);
              setNet(n => bigDecimal.add(n, totals.net));
              setTransactions(t => bigDecimal.add(t, totals.transactions));
              setFees(f => bigDecimal.add(f, totals.fees));
            })
            .catch(rejected => { zeroOut(); setError(true) });
        });
      })
      .catch(rejected => { zeroOut(); setError(true) });
  }, [props.apiKey, props.merchantId, today]);

  if (net !== zero || transactions !== zero || fees !== zero) {
    return (
      <FundingCard net={net} transactions={transactions} fees={fees}/>
    );
  } else if (!error) {
    return (
      <Placeholder />
    );
  } else {
    return (
      <Error />
    );
  }
}

function FundingCard(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Latest Funding Summary
      </Typography>
      <Typography component="p" variant="h3" >
        £{props.net}
      </Typography>
      <Typography component="p" variant="h7" color={theme.palette.green.main}>
        Transactions: £{props.transactions}
      </Typography>
      <Typography component="p" variant="h7" color={theme.palette.red.main}>
        Deductions: £{props.fees}
      </Typography>
    </React.Fragment>
  );
}

function calculateTotals(fundingDetails)  {
  var net = 0;
  var transactions = 0;
  var fees = 0;
  for (var i = 0; i < fundingDetails.length; i++) {
    const netAmount = parseFloat(fundingDetails[i].financial.netAmount);
    net += netAmount;
    if (netAmount > 0) {
      transactions += netAmount
    } else {
      fees += netAmount;
    }
  }

  return {
    net: net.toFixed(2),
    transactions: transactions.toFixed(2),
    fees: fees.toFixed(2),
  };
}