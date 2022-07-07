import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { CreditCard, PhoneAndroid, AccountBalanceWallet } from "@mui/icons-material";
import Placeholder from './Placeholder';
import { config } from '../../Config/constants';

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const url = config.baseUrl + '/transactions?sort=-posted&limit=20';
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then(results => results.json())
      .then(data => setTransactions(data))
      .catch(rejected => setTransactions([]));
  }, [props.apiKey, props.merchantId]);

  if (transactions.length > 0) {
    return (<TransactionsTable transactions={transactions}/>);
  } else {
    return (
      <Placeholder />
    );
  }
}

function TransactionsTable(props) {
  const theme = useTheme();
  const transactions = props.transactions;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Recent Transactions
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{color: theme.palette.text.main}}>Posted</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Authorised</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Channel</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Method</TableCell>
            <TableCell style={{color: theme.palette.text.main}}>Brand / Service</TableCell>
            <TableCell style={{color: theme.palette.text.main}} align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id} >
              <TableCell style={{color: theme.palette.text.main}}>{row.posted}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{row.authorised}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}>{row.channel}</TableCell>
              <TableCell style={{color: theme.palette.text.main}}><Category value={row.paymentInstrument.category} /></TableCell>
              <TableCell style={{color: theme.palette.text.main}}>
                <Method category={row.paymentInstrument.category} 
                        brand={row.paymentInstrument.brand} 
                        service={row.paymentInstrument.service}/>
              </TableCell>
              <TableCell style={{color: theme.palette.text.main}} align="right">{`£${row.financial.amounts.transacted}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

const Method = ({ category, brand, service }) => {

  if (category === "CARD") {
    return brand;
  }
  if (category === "CASH") {
    return "N/A";
  }
  if (category === "ALTERNATIVE") {
    return service;
  }
};


const Category = ({ value }) => {
  if (value === "CARD") {
    return <Tooltip title={value}><CreditCard /></Tooltip>;
  }
  if (value === "CASH") {
    return <Tooltip title={value}><AccountBalanceWallet /></Tooltip>;
  }
  if (value === "ALTERNATIVE") {
    return <Tooltip title={value}><PhoneAndroid /></Tooltip>;
  }
};