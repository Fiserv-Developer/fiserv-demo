import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
import Placeholder from '../Placeholder';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

Chart.register(ArcElement, Tooltip, Legend);
var bigDecimal = require('js-big-decimal');

const zero = "0.00";

export default function Fundings(props) {
  const [net, setNet] = useState(zero);
  const [transactions, setTransactions] = useState(zero);
  const [fees, setFees] = useState(zero);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(true);

  // get fundings
  useEffect(() => {
    setError(false);
    setProcessing(true);

    // get yesterdays date
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().substring(0, 10);

    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    // so we know when we're finished calculating
    var count = 0;

    // make api call to get fundings
    fetchWithRetry(config.baseUrl + '/fundings?sort=-funded&fundedAfter=' + yesterdayISO + '&fundedBefore=' + yesterdayISO, {
      method: 'GET',
      headers: headers,
    }).then(fundings => {
      // get all details and sum up the values
      fundings.forEach(funding => {
        count = count + 1;
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
            count = count - 1;
            if (count < 1) {
              setProcessing(false);
            }
          })
          .catch(rejected => { 
            setError(true);
            setProcessing(false);
          });
      });
    })
    .catch(rejected => { 
      setError(true);
      setProcessing(false);
    });
  }, [props.apiKey, props.merchantId]);

  if (processing) {
    return (<Placeholder />);
  } else if (error) {
    return (<Error />);
  } else {
    return (<FundingCard net={net} transactions={transactions} fees={fees}/>);
  }
}

function FundingCard(props) {
  const theme = useTheme();
  Chart.defaults.color = theme.palette.text.primary;

  const chartData = {
    labels: ['Transactions', 'Deductions'],
    datasets: [
      {
        data: [props.transactions, props.fees],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.light,
        ],
        borderColor: [
          theme.palette.primary.main,
          theme.palette.secondary.light,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        alignment: 'left'
      }
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" sx={{width: '100%'}} gutterBottom>
        Yesterday's Funding Summary
      </Typography>
      <Box sx={{display: 'flex', height: '100%'}}>
        <Doughnut options={options} data={chartData} style={{maxWidth: '260px', maxHeight: '150px'}}/>
      </Box>
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