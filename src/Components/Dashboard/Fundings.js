import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Placeholder from './Placeholder';
import { config } from '../../Config/constants';

const zero = "0.00";

export default function Fundings(props) {
  const [net, setNet] = useState(zero);
  const [transactions, setTransactions] = useState(zero);
  const [fees, setFees] = useState(zero);

  const today = new Date().toISOString().substring(0, 10);
  const lastWeekDate = new Date()
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);

  // get fundings
  useEffect(() => {
    const url = config.baseUrl + '/fundings?sort=-funded&fundedAfter=' + today + '&fundedBefore=' + today;
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then(results => results.json())
      .then(fundings => {
        
        // zero everything out
        setNet(zero);
        setTransactions(zero);
        setFees(zero);

        // get all details
        fundings.forEach(funding => {
          const url = config.baseUrl + '/fundings/' + funding.id + "/details";
          fetch(url, {
            method: 'GET',
            headers: {
              'Api-Key': props.apiKey,
              'Accept': 'application/json'
            }
          }).then(results => results.json())
            .then(details => {
              const totals = calculateTotals(details);
              setNet(totals.net);
              setTransactions(totals.transactions);
              setFees(totals.fees);
            })
            .catch(rejected => {
              setNet(zero);
              setTransactions(zero);
              setFees(zero);
            });
        });
      })
      .catch(rejected => {
        setNet(zero);
        setTransactions(zero);
        setFees(zero);
      });
  }, [props.apiKey, props.merchantId, today]);

  if (net !== zero || transactions !== zero || fees !== zero) {
    return (
      <FundingCard net={net} transactions={transactions} fees={fees}/>
    );
  } else {
    return (
      <Placeholder />
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
      <Typography component="p" variant="h3" color={theme.palette.text.main}>
        ??{props.net}
      </Typography>
      <Typography component="p" variant="h7" color={theme.palette.green.main}>
        Transactions: ??{props.transactions}
      </Typography>
      <Typography component="p" variant="h7" color={theme.palette.red.main}>
        Deductions: ??{props.fees}
      </Typography>
    </React.Fragment>
  );
}

function calculateTotals(data)  {
  var net = 0;
  var transactions = 0;
  var fees = 0;
  for (var i = 0; i < data.length; i++) {
    const netAmount = parseFloat(data[i].financial.netAmount);
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