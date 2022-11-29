import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { config } from '../../Config/constants';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
import Placeholder from '../Placeholder';

export default function Statements(props) {
  const [statements, setStatements] = useState([]);
  const [downloadStatement, setDownloadStatement] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);

    // calculate dates
    const lastYearDate = new Date()
    lastYearDate.setDate(lastYearDate.getDate() - 365);
    const lastYear = lastYearDate.toISOString().substring(0, 10) + "T23:59:59Z";
    const today = new Date().toISOString().substring(0, 10) + "T00:00:00Z";
    
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    // make request
    fetchWithRetry(config.baseUrl + '/statements?createdAfter=' + lastYear + "&createdBefore=" + today + "&limit=12", {
      method: 'GET',
      headers: headers,
    }).then(data => setStatements(data.reverse()))
      .catch(rejected => { setStatements([]); setError(true)});
  }, [props.apiKey, props.merchantId]);

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
    return (<Placeholder />);
  } else {
    return (<Error />);
  }
}

function StatementsTable(props) {
  const rows = mapStatements(props.statements);
  const columns = [
    { 
      field: 'year', headerName: 'Year', align: 'center', headerAlign: 'center',
    },
    { 
      field: 'month', headerName: 'Month', align: 'center', headerAlign: 'center',
      sortComparator: (v1, v2) => new Date(`${v1} 1, 2022`).getMonth() - new Date(`${v2} 1, 2022`).getMonth(),
    },
    { 
      field: 'id', headerName: '', align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Button onClick={() => downloadPdf(props.apiKey, params.value, props.setDownloadStatement)}>View</Button>
        );
      },
    }
  ];


  return (
    <Box style={{ overflow: 'auto', height: '100%', width: '100%'}}>
      <Typography component="h2" variant="h6" gutterBottom>
        Recent Statements
      </Typography>
      <DataGrid rows={rows} columns={columns} sx={{ height: '100%', width: '100%', }}
        autoHeight
        pagination
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 12]}
        initialState={{
          pagination: {
            pageSize: 7,
          },
        }}/>
    </Box>
  );
}

function mapStatements(statements) {
  return statements.map((statement) => {
    return {
      year: dateToYear(statement.from),
      month: dateToMonth(statement.from),
      id: statement.id
    }
  });
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
