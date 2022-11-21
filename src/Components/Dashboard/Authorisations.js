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
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState({labels: [], approved: [], declined: []});
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const url = config.baseUrl + '/authorisations?createdAfter=2022-11-01&createdBefore=2022-11-08&limit=1000';
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
    }).then(data => { setData(data); setLineData(groupByTenMinutes(data)) })
      .catch(rejected => { setData([]); setError(true) });
  }, [props.apiKey, props.merchantId]);

  if (data.length > 0) {
    return (<AuthorisationsChart data={lineData}/>);
  } else if (!error) {
    return (
      <Placeholder />
    );
  } else {
    return (
      <Error />
    )
  }
}

function AuthorisationsChart(props) {
  const theme = useTheme();

  const lineData = {
    labels: props.data.labels,
    datasets: [
      {
        label: 'Approved',
        data: props.data.approved,
        borderColor: theme.palette.green.main,
        backgroundColor: theme.palette.green.main,
      },
      {
        label: 'Declined',
        data: props.data.declined,
        borderColor: theme.palette.red.main,
        backgroundColor: theme.palette.red.main,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Authorisations
      </Typography>
      <Line options={options} data={lineData}/>
    </React.Fragment>
  );
}

function groupByTenMinutes(records) {
  const groups = [];
  const labels = [];
  const approved = [];
  const declined = [];
  records.forEach((record) => {
    console.log("Calcating line chart")
    const time = record.created.slice(11, 15) + "0"; // get 10 minute bracket
    var index = groups.findIndex((entry) => entry.time === time);
    if(index === -1) {
      labels.push(time);
      approved.push(0);
      declined.push(0);
      groups.push({time: time, approved: 0, declined: 0});
      index = groups.findIndex((entry) => entry.time === time);
    }
    if (record.status === "APPROVED")  {
      approved[index] += 1;
    } else if (record.status === "DECLINED") {
      declined[index] += 1;
    }    
  });
  return {
    labels: labels,
    approved: approved,
    declined: declined
  };
}