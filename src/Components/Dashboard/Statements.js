import { useTheme } from '@mui/material/styles';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Placeholder from '../Placeholder';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';

export default function Statements(props) {
  const [statements, setStatements] = useState([]);
  const [downloadStatement, setDownloadStatement] = useState(null);
  const [error, setError] = useState(false);

  const today = new Date().toISOString().substring(0, 10) + "T00:00:00Z";
  const lastYearDate = new Date()
  lastYearDate.setDate(lastYearDate.getDate() - 365);
  const lastYear = lastYearDate.toISOString().substring(0, 10) + "T23:59:59Z";
  
  useEffect(() => {
    setError(false);
    const url = config.baseUrl + '/statements?createdAfter=' + lastYear + "&createdBefore=" + today + "&limit=5";
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };

    fetchWithRetry(url, {
      method: 'GET',
      headers: headers,
    }).then(data => setStatements(data.reverse().slice(0, 4)))
      .catch(rejected => { setStatements([]); setError(true)});
  }, [props.apiKey, today, lastYear]);

  useEffect(() => {
    if (downloadStatement) {

      const uri = 'data:application/pdf;base64,' + downloadStatement.content;
      var w = window.open('about:blank');

      setTimeout(function(){
        const iframe = w.document.createElement('iframe');
        const body = w.document.getElementsByTagName('body')[0];
        body.style = "margin: 0;"
        iframe.height = "100%";
        iframe.width = "100%";
        w.document.body.appendChild(iframe).src = uri;
      }, 0);
    }
  }, [downloadStatement]);

  if (statements.length > 0) {
    return (<StatementsTable apiKey={props.apiKey} statements={statements} setDownloadStatement={setDownloadStatement} />);
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

function StatementsTable(props) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Recent Statements
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{color: theme.palette.text.main}}>Year</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Month</TableCell>
            <TableCell style={{color: theme.palette.text.main}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.statements.map((row) => (
            <TableRow key={row.id} >
              <TableCell style={{color: theme.palette.text.main}}>{dateToYear(row.from)}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{dateToMonth(row.from)}</TableCell>
              <TableCell style={{color: theme.palette.text.main}} align="right"><Button onClick={() => downloadPdf(props.apiKey, row.id, props.setDownloadStatement)}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

function dateToYear(date) {
  return (new Date(date)).getFullYear();
}

function dateToMonth(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return monthNames[(new Date(date)).getMonth()];
}

function downloadPdf(apiKey, id, setDownloadStatement) {
  const url = config.baseUrl + '/statements/' + id;
    const headers = {
      'Api-Key': apiKey,
      'Accept': 'application/json',
    };

    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then(results => results.json())
      .then(data => setDownloadStatement(data))
      .catch(rejected => setDownloadStatement(null));
}
