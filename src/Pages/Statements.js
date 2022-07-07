import { useTheme } from '@mui/material/styles';
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Placeholder from '../Components/Dashboard/Placeholder';
import { config } from '../Config/constants';
import { getValueOrDefault } from '../Config/utils';

export default function Statements(props) {
  const theme = useTheme();
  // todo pass these in as state props
  const [apiKey, setApiKey] = useState(() => getValueOrDefault(config.apiKey, ""));
  const [statements, setStatements] = useState([]);
  const [downloadStatement, setDownloadStatement] = useState(null);

  const today = new Date().toISOString().substring(0, 10) + "T00:00:00Z";
  const lastYearDate = new Date()
  lastYearDate.setDate(lastYearDate.getDate() - 365);
  const lastYear = lastYearDate.toISOString().substring(0, 10) + "T23:59:59Z";
  
  useEffect(() => {
    const url = config.baseUrlTest + '/statements?createdAfter=' + lastYear + "&createdBefore=" + today;
    const headers = {
      'Api-Key': apiKey,
      'Accept': 'application/json',
    };

    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then(results => results.json())
      .then(data => setStatements(data))
      .catch(rejected => setStatements([]));
  }, [apiKey]);

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
    return (<StatementsTable apiKey={apiKey} statements={statements} setDownloadStatement={setDownloadStatement} />);
  } else {
    return (
      <React.Fragment>
        <Typography component="p" variant="p" color={theme.palette.text.main} gutterBottom>
          <i>Note that this currently requires a <b>non-prod</b> sandbox key for use with the 'test.' environment, as the proxy is not available in prod</i>
        </Typography>
        <Placeholder />
      </React.Fragment>
    );
  }
}

function StatementsTable(props) {
  const theme = useTheme();

  return (
    <Container>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Recent Statements
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{color: theme.palette.text.main}}>Created</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Date</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>From</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>To</TableCell>
            <TableCell style={{color: theme.palette.text.main}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.statements.map((row) => (
            <TableRow key={row.id} >
              <TableCell style={{color: theme.palette.text.main}}>{row.created}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{row.date}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{row.from}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{row.to}</TableCell>
              <TableCell style={{color: theme.palette.text.main}} align="right"><Button onClick={() => downloadPdf(props.apiKey, row.id, props.setDownloadStatement)}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

function downloadPdf(apiKey, id, setDownloadStatement) {
  const url = config.baseUrlTest + '/statements/' + id;
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
