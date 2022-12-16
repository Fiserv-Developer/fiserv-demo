import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
import Placeholder from '../Placeholder';

Chart.register(...registerables); // avoid having to register manually, maybe tidy later

export default function Authorisations(props) {
  const [lineData, setLineData] = useState({labels: [], approved: [], declined: [], amountApproved: [], amountDeclined: []});
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    setProcessing(true);
    setError(false);

    // calculate dates
    const lastWeekDate = new Date()
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const lastWeek = lastWeekDate.toISOString().substring(0, 10);
    const today = new Date().toISOString().substring(0, 10);

    const url = `${config.baseUrl}/authorisations?createdAfter=${lastWeek}&createdBefore=${today}&limit=1000`;
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetchWithRetry(url, {
      method: 'GET',
      headers: headers
    }).then(data => { 
      setLineData(groupByTenMinutes(data)); 
      setProcessing(false); 
    }).catch(rejected => { 
      setError(true); 
      setProcessing(false);
    });

  }, [props.apiKey, props.merchantId]);

  if (processing) {
    return (<Placeholder />);
  } else if (error) {
    return (<Error />);
  } else {
    return (<AuthorisationsChart data={lineData}/>);
  }
}

function AuthorisationsChart(props) {
  const theme = useTheme();
  Chart.defaults.color = theme.palette.background.line;
  Chart.defaults.borderColor = theme.palette.background.line;

  const lineData = {
    labels: props.data.labels,
    datasets: [
      {
        label: 'Amount Approved',
        data: props.data.amountApproved,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.translucent,
        fill: '1',
        // yAxisID: 'B',
        tension: 0.4,
      },
      {
        label: 'Amount Declined',
        data: props.data.amountDeclined,
        borderColor: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.translucent,
        fill: '2',
        // yAxisID: 'B',
        tension: 0.4,
      },
      {
        label: 'Approved',
        data: props.data.approved,
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.light,
        fill: '3',
        // yAxisID: 'A',
        tension: 0.4,
      },
      {
        label: 'Declined',
        data: props.data.declined,
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        fill: 'origin',
        // yAxisID: 'A',
        tension: 0.4,
      },
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index'
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Authorisations
      </Typography>
      <Line options={options} data={lineData} style={{ maxHeight: '220px' }}/>
    </React.Fragment>
  );
}

function groupByTenMinutes(records) {
  const groups = [];
  const labels = [];
  const approved = [];
  const declined = [];
  const amountApproved = [];
  const amountDeclined = [];
  records.forEach((record) => {
    const time = record.created.slice(11, 15) + "0"; // get 10 minute bracket
    var index = groups.findIndex((entry) => entry.time === time);
    if(index === -1) {
      labels.push(time);
      amountApproved.push(0);
      amountDeclined.push(0);
      approved.push(0);
      declined.push(0);
      groups.push({time: time, approved: 0, declined: 0});
      index = groups.findIndex((entry) => entry.time === time);
    }
    if (record.status === "APPROVED")  {
      approved[index] += 1;
      amountApproved[index] += parseFloat(record.financial.amounts.authorised);
    } else if (record.status === "DECLINED") {
      declined[index] += 1;
      amountDeclined[index] += parseFloat(record.financial.amounts.authorised);
    }    
  });
  return {
    labels: labels,
    approved: approved,
    declined: declined,
    amountApproved: amountApproved,
    amountDeclined: amountDeclined,
  };
}