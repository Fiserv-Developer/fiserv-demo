import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography'
import Placeholder from '../Placeholder';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';

export default function Authorisations(props) {
  const [data, setData] = useState([]);
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
    }).then(data => setData(groupByTenMinutes(data)))
      .catch(rejected => { setData([]); setError(true) });
  }, [props.apiKey, props.merchantId]);

  if (data.length > 0) {
    return (<AuthorisationsChart data={data}/>);
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

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Authorisations
      </Typography>
      <ResponsiveContainer style={{ height: '220px' }}>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          style={{ height: '220px' }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.main}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.main}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.main,
              }}
            >
              Approves vs Declines
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="approved"
            stroke={theme.palette.green.main}
            dot={false}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="declined"
            stroke={theme.palette.red.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

function groupByTenMinutes(records) {
  const groups = [];
  records.forEach((record) => {
    const time = record.created.slice(11, 15) + "0"; // get 10 second bracket
    var index = groups.findIndex((entry) => entry.time === time);
    if(index === -1) {
      groups.push({time: time, approved: 0, declined: 0})
      index = 0;
    }
    if (record.status === "APPROVED")  {
      groups[index].approved += 1;
    } else if (record.status === "DECLINED") {
      groups[index].declined += 1;
    }    
  });
  return groups;
}