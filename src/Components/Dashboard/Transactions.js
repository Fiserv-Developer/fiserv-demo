import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LanguageIcon from '@mui/icons-material/Language';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { config } from '../../Config/constants';
import useWindowDimensions, { fetchWithRetry } from '../../Config/utils';
import Error from '../Error';
import Placeholder from '../Placeholder';

// TODO make this look better on mobile
export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setError(false);

    // calculate dates
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().substring(0, 10);
    const today = new Date().toISOString().substring(0, 10);

    const url = config.baseUrl + `/transactions?postedAfter=${yesterday}&postedBefore=${today}&limit=1000`;
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
  const screen = useWindowDimensions();
  const rows = mapTransactions(props.transactions);
  const columns = [
    { 
      field: 'status', headerName: 'Status', width: 150, align: 'center', headerAlign: 'center', flex: 0.1,
      renderCell: (params) => {
        if (params.value === 'CLEARED') {
          return (<CheckCircleIcon sx={{ color: theme.palette.green.main }}/>);
        } else {
          return (<CancelIcon sx={{ color: theme.palette.red.main }}/>);
        }
      },
    },
    { 
      field: 'authorised', headerName: 'Authorised', width: 300, align: 'center', headerAlign: 'center', flex: 0.2,
    },
    { 
      field: 'posted', headerName: 'Cleared', width: 300, align: 'center', headerAlign: 'center', flex: 0.2, 
      hide: (screen.width <= config.responsiveScreenWidth),
    },
    { 
      field: 'channel', headerName: 'Channel', width: 150, align: 'center', headerAlign: 'center', flex: 0.1,
      renderCell: (params) => {
        if (params.value === 'ECOMMERCE') {
          return <LanguageIcon />
        } else {
          return <PointOfSaleIcon />
        }
      },
    },
    { 
      field: 'method', headerName: 'Method', width: 150, align: 'center', headerAlign: 'center', flex: 0.2,
      renderCell: (params) => {
        return (
          <Method type={params.value}/>
        );
      },
      hide: (screen.width <= config.responsiveScreenWidth),
    },
    { 
      field: 'amount', headerName: 'Amount', width: 150, align: 'center', headerAlign: 'center', flex: 0.2,
    }
  ];

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <DataGrid 
        rows={rows} columns={columns} 
        components={{ Toolbar: GridToolbar }} 
        autoHeight
        checkboxSelection={screen.width > config.responsiveScreenWidth ? true : false}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            pageSize: 10,
          },
          sorting: {
            sortModel: [{ field: 'authorised', sort: 'desc' }],
          },
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