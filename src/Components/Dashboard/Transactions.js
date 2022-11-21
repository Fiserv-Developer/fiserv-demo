import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Placeholder from '../Placeholder';
import { config } from '../../Config/constants';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';

export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);
    const url = config.baseUrl + '/transactions?limit=1000';
    const headers = {
      'Api-Key': props.apiKey,
      'Accept': 'application/json',
    };
    if (props.merchantId) {
      headers['Merchant-Id'] = props.merchantId;
    }

    fetchWithRetry(url, {
      method: 'GET',
      headers: headers,
    }).then(data => setTransactions(data))
      .catch(rejected => {setTransactions([]); setError(true)});
  }, [props.apiKey, props.merchantId]);

  if (transactions.length > 0) {
    return (<TransactionsTable transactions={transactions}/>);
  } else if (!error) {
    return (<Placeholder />);
  } else {
    return (
      <Error />
    );
  }
}

function TransactionsTable(props) {
  const theme = useTheme();

  const rows = mapTransactions(props.transactions);
  const columns = [
    { 
      field: 'status', headerName: 'Status', width: 150, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        if (params.value === 'CLEARED') {
          return <CheckCircleIcon />
        } else {
          return <CancelIcon />
        }
      },
    },
    { 
      field: 'authorised', headerName: 'Authorised', width: 300, align: 'center', headerAlign: 'center',
    },
    { 
      field: 'posted', headerName: 'Cleared', width: 300, align: 'center', headerAlign: 'center',
    },
    { 
      field: 'channel', headerName: 'Channel', width: 150, align: 'center', headerAlign: 'center',
    },
    { 
      field: 'method', headerName: 'Method', width: 150, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Method type={params.value}/>
        );
      },
    },
    { 
      field: 'amount', headerName: 'Amount', width: 150, align: 'center', headerAlign: 'center',
    }
  ];

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color={theme.palette.text.main} gutterBottom>
        Recent Transactions
      </Typography>
      <DataGrid rows={rows} columns={columns} 
        components={{ Toolbar: GridToolbar }} 
        sx={{
          height: '100%', minHeight: '400px',
          '& .MuiDataGrid-cellContent, & .MuiDataGrid-columnHeaderTitleContainer, & .MuiButton-root, & .MuiTablePagination-displayedRows, & .MuiTablePagination-actions': {
            color: theme.palette.text.main
          },
        }}
        checkboxSelection={true} 
        componentsProps={{
          toolbar: {
            sx: {
              '& .MuiButton-root': {
                color: theme.palette.text.main
              }
            }
          }
      }}/>
    </React.Fragment>
  )
}

const mapTransactions = (transactions) => {
  return transactions.map((transaction) => {
    return {
      id: transaction.id,
      authorised: (new Date(transaction.authorised)).toUTCString(),
      posted: (new Date(transaction.posted)).toUTCString(),
      status: transaction.status,
      channel: transaction.channel, // todo map to icon?
      method: getMethod(transaction.paymentInstrument.category, transaction.paymentInstrument.brand, transaction.paymentInstrument.service),
      amount: "£" + transaction.financial.amounts.transacted,
    }
  })
};

const getMethod = (category, brand, service) => {
  if (category === "CARD") {
    return brand;
  }
  if (category === "CASH") {
    return "CASH";
  }
  if (category === "ALTERNATIVE") {
    return service;
  }
};

const Method = ({ type }) => {
  return <img alt='Diners card logo' src={"../payment-methods/" + type.toLowerCase() + ".png"} style={{ width: '5em' }} />;
};