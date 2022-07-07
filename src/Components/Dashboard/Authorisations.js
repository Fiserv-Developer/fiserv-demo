import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography'
import Placeholder from './Placeholder';
import { config } from '../../Config/constants';

export default function Authorisations(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = config.baseUrl + '/authorisations?limit=1000';
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetch(url, {
      method: 'GET',
      headers: headers
    }).then(results => results.json())
      .then(data => setData(groupByTenMinutes(data)))
      .catch(rejected => setData([]));
  }, [props.apiKey, props.merchantId]);

  if (data.length > 0) {
    return (<AuthorisationsChart data={data}/>);
  } else {
    return (
      <Placeholder />
    );
  }
}

function AuthorisationsChart(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Authorisations
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={props.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
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