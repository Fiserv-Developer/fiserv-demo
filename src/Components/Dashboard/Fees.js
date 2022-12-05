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
import { CenteredBox } from '../CenteredBox';

Chart.register(ArcElement, Tooltip, Legend);
var bigDecimal = require('js-big-decimal');

const zero = "0.00";

export default function Fees(props) {
  const [total, setTotal] = useState(zero);
  const [interchange, setInterchange] = useState(zero);
  const [refunds, setRefunds] = useState(zero);
  const [chargebacks, setChargebacks] = useState(zero);
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
          setTotal(n => bigDecimal.add(n, totals.total));
          setInterchange(i => bigDecimal.add(i, totals.interchange));
          setRefunds(r => bigDecimal.add(r, totals.refunds));
          setChargebacks(c => bigDecimal.add(c, totals.chargebacks));
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
    return (
      <FeeCard total={total} interchange={interchange} refunds={refunds} chargebacks={chargebacks}/>
    );
  }
}

function FeeCard(props) {
  const theme = useTheme();
  Chart.defaults.color = theme.palette.text.primary;

  const chartData = {
    labels: ['Interchange', 'Refunds', 'Chargebacks'],
    datasets: [
      {
        data: [props.interchange, props.refunds, props.chargebacks],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.light,
          theme.palette.secondary.main,
        ],
        borderColor: [
          theme.palette.primary.main,
          theme.palette.secondary.light,
          theme.palette.secondary.main,
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
    <CenteredBox>
      <Typography component="h2" variant="h6" sx={{ width: '100%'}} gutterBottom>
        Yesterday's Deduction Breakdown
      </Typography>
      <Box sx={{display: 'flex', height: '100%', maxWidth: '260px', maxHeight: '150px', margin: '0 auto'}}>
        <Doughnut options={options} data={chartData} style={{maxWidth: '260px', maxHeight: '150px'}}/>        
      </Box>
    </CenteredBox>
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