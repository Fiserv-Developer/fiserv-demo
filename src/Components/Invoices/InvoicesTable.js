import { Box, Button, Typography, useTheme } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Error from "../Error";
import Placeholder from "../Placeholder";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PendingIcon from '@mui/icons-material/Pending';
import useWindowDimensions from "../../Config/utils";
import { config } from "../../Config/constants";

export function InvoicesTable(props) {
  const theme = useTheme();
  const screen = useWindowDimensions();

  const rows = props.invoices;
  const columns = [
    { 
      field: 'status', headerName: 'Status', align: 'center', headerAlign: 'center', flex: 0.2,
      renderCell: (params) => {
        if (params.value === 'APPROVED') {
          return (<CheckCircleIcon sx={{ color: theme.palette.green.main }}/>);
        } else {
          return (<PendingIcon />);
        }
      },
    },
    { 
      field: 'expires', headerName: 'Expires', align: 'center', headerAlign: 'center', flex: 1,
      renderCell: (params) => {
        return (new Date(params.value)).toUTCString();
      },
    },
    { 
      field: 'amount', headerName: 'Amount', align: 'center', headerAlign: 'center', flex: 0.8,
      renderCell: (params) => {
        return (
          <div>{'£' + params.value.toFixed(2)}</div>
        );
      },
    },
    { 
      field: 'link', headerName: 'Link', align: 'center', headerAlign: 'center', flex: 0.8, direction: 'column',
      renderCell: (params) => {
        if (params.getValue(params.row.id, 'status') === 'APPROVED') {
          return (
            <Button onClick={() => window.open(params.value, '_blank').focus()}><ReceiptIcon /> View Receipt</Button>
          );
        } else {
          return (
            <Button onClick={() => {props.setCurrentLink(params.value); props.handleSendInvoiceOpen()}}><MailOutlineIcon /> Send</Button>
          );
        }
      },
    }
  ];

  if (props.error) {
    return (<Error />);
  } else if (props.loading) {
    return (<Placeholder />);
  } else {
    return (
      <Box style={{ overflow: 'auto', height: '100%', width: '100%'}}>
        <Typography component="h2" variant="h6" gutterBottom>
          Recent Links
        </Typography>
        <DataGrid 
          rows={rows} columns={columns} 
          sx={{ height: '100%', width: '100%', }}
          components={{ Toolbar: GridToolbar }} 
          autoHeight
          checkboxSelection={screen.width > config.responsiveScreenWidth ? true : false}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 12, 20]}
          initialState={{
            pagination: {
              pageSize: 7,
            },
            sorting: {
              sortModel: [{ field: 'expires', sort: 'asc' }],
            },
          }}/>
      </Box>
    );
  }
}