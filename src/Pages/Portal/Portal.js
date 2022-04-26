import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Home() {
  const localApiKey = "apiKey";
  const [authorisations, setAuthorisations] = useState([]);
  
  useEffect(() => {
    const apiKeyJson = localStorage.getItem(localApiKey);
    const apiKey = JSON.parse(apiKeyJson);

    fetch('https://test.emea.api.fiservapps.com/sandbox/exp/v1/authorisations?sort=-created', {
      method: 'GET',
      headers: {
        'Api-Key': apiKey,
        'Accept': 'application/json'
      }
    }).then(results => results.json())
      .then(data => setAuthorisations(data))
      .catch(rejected => console.log(rejected));
  }, []);

  return (
    <div className="content">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>created</TableCell>
            <TableCell>status</TableCell>
            <TableCell>code</TableCell>
            <TableCell>terminal id</TableCell>
            <TableCell>currency</TableCell>
            <TableCell>amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authorisations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.created}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.captureEnvironment.terminal.id}</TableCell>
                  <TableCell>{row.financial.amounts.currencyCode}</TableCell>
                  <TableCell align="right">{`$${row.financial.amounts.authorised}`}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
