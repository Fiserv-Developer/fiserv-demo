import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
import Placeholder from '../Placeholder';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);
var bigDecimal = require('js-big-decimal');

const zero = "0.00";

export default function Fees(props) {
  const [total, setTotal] = useState(zero);
  const [interchange, setInterchange] = useState(zero);
  const [refunds, setRefunds] = useState(zero);
  const [chargebacks, setChargebacks] = useState(zero);
  const [error, setError] = useState(false);

  const zeroOut = () => {
    setTotal(zero);
    setInterchange(zero);
    setRefunds(zero);
    setChargebacks(zero);
  };

  // get fundings
  useEffect(() => {
    setError(false);

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

    // make api call to get fundings
    fetchWithRetry(config.baseUrl + '/fundings?sort=-funded&fundedAfter=' + yesterdayISO + '&fundedBefore=' + yesterdayISO, {
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
              setTotal(n => bigDecimal.add(n, totals.total));
              setInterchange(i => bigDecimal.add(i, totals.interchange));
              setRefunds(r => bigDecimal.add(r, totals.refunds));
              setChargebacks(c => bigDecimal.add(c, totals.chargebacks));
            })
            .catch(rejected => { zeroOut(); setError(true) });
        });
      })
      .catch(rejected => { zeroOut(); setError(true) });
  }, [props.apiKey, props.merchantId]);

  if (total !== zero || interchange !== zero || refunds !== zero || chargebacks !== zero) {
    return (
      <FeeCard total={total} interchange={interchange} refunds={refunds} chargebacks={chargebacks}/>
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

function FeeCard(props) {
  const theme = useTheme();

  const chartData = {
    labels: ['Interchange', 'Refunds', 'Chargebacks'],
    datasets: [
      {
        data: [props.interchange, props.refunds, props.chargebacks],
        backgroundColor: [
          theme.palette.orange.main,
          theme.palette.green.main,
          theme.palette.red.main,
        ],
        borderColor: [
          theme.palette.orange.main,
          theme.palette.green.main,
          theme.palette.red.main,
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
      <Typography component="h2" variant="h6" sx={{color: theme.palette.text.main, width: '100%'}} gutterBottom>
        Yesterday's Deduction Breakdown
      </Typography>
      <Box sx={{display: 'flex', height: '100%'}}>
        <Doughnut options={options} data={chartData} style={{maxWidth: '260px', maxHeight: '150px'}}/>        
      </Box>
    </React.Fragment>
  );
}

function calculateTotals(fundingDetails)  {
  var total = 670;
  var interchange = 0;
  var refunds = 550;
  var chargebacks = 120;
  for (var i = 0; i < fundingDetails.length; i++) {
    const amount = parseFloat(fundingDetails[i].financial.netAmount);
    if (fundingDetails[i].type.code === '832') {
      total += -amount;
      interchange += -amount;
    }// todo other types if we had them in sandbox
  }

  return {
    total: '-' + total.toFixed(2),
    interchange: '-' + interchange.toFixed(2),
    refunds: '-' + refunds.toFixed(2),
    chargebacks: '-' + chargebacks.toFixed(2),
  };
}