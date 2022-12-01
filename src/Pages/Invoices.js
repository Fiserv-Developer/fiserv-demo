import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import BodyElement from '../Components/BodyElement';
import { config } from '../Config/constants';
import { links } from '../Config/data';
import { getValueOrDefault } from '../Config/utils';
import AddIcon from '@mui/icons-material/Add';
import NewInvoice from '../Components/Invoices/NewInvoice';
import CreatedInvoice from '../Components/Invoices/CreatedInvoice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CenteredBox } from '../Components/CenteredBox';
import { Title } from '../Components/Title';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendInvoice from '../Components/Invoices/SendInvoice';

export default function Invoices() {
  const theme = useTheme();
  const apiKey = getValueOrDefault(config.apiKey, "");
  const [invoices, setInvoices] = useState([]);
  const [activeLinks, setActiveLinks] = useState(0);
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [newLink, setNewLink] = useState("");
  const [currentLink, setCurrentLink] = useState("");

  // modals
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [newInvoiceAnimationState, setNewInvoiceAnimationState] = useState("expand");
  const handleNewInvoiceOpen = () => {
    setNewLink("");
    setNewInvoiceAnimationState("expand");
    setNewInvoiceOpen(true);
  }
  const handleNewInvoiceClose = () => {
    setNewInvoiceAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  const [createdInvoiceOpen, setCreatedInvoiceOpen] = useState(false);
  const [createdInvoiceAnimationState, setCreatedInvoiceAnimationState] = useState("expand");
  const handleCreatedInvoiceOpen = () => {
    setNewInvoiceAnimationState("contract");
    setCreatedInvoiceAnimationState("expand");
    setCreatedInvoiceOpen(true);
  }
  const handleCreatedInvoiceClose = () => {
    setCreatedInvoiceAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false);
  const [sendInvoiceAnimationState, setSendInvoiceAnimationState] = useState("expand");
  const handleSendInvoiceOpen = () => {
    setSendInvoiceAnimationState("expand");
    setSendInvoiceOpen(true);
  }
  const handleSendInvoiceClose = () => {
    setSendInvoiceAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  useEffect(() => {  
    // make request TODO for now we just use static mock data
    const invoices = mapInvoices(links)
    setInvoices(invoices);
    setActiveLinks(invoices.filter((invoice) => invoice.status === 'WAITING').length);
    setOutstandingAmount(getOustandingAmount(invoices));
    setPaidAmount(getPaidAmound(invoices));
  }, [apiKey]);

  const getOustandingAmount = (invoices) => {
    return invoices
      .filter((invoice) => invoice.status === 'WAITING')
      .reduce((partialSum, invoice) => partialSum + parseFloat(invoice.amount), 0);
  }

  const getPaidAmound = (invoices) => {
    return invoices
      .filter((invoice) => invoice.status === 'APPROVED')
      .reduce((partialSum, invoice) => partialSum + parseFloat(invoice.amount), 0);
  }

  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <Title icon={<ReceiptIcon />} primary="Invoices" secondary="View existing open invoices / payment links, or generate new ones" />
        <Button 
          sx={{ 
            maxWidth: '200px', 
            color: theme.palette.primary.contrastText, 
            backgroundColor: theme.palette.primary.main, 
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
            position: 'absolute',
            right: '44px',
          }} 
          onClick={handleNewInvoiceOpen}
        >
          <AddIcon />New
        </Button>
      </BodyElement>

      <BodyElement xs={12} md={4}>
        <CenteredBox>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>{activeLinks}</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Active links</Typography>
        </CenteredBox>
      </BodyElement>

      <BodyElement xs={12} md={4}>
        <CenteredBox>
          <Typography variant="h2">£{outstandingAmount.toFixed(2)}</Typography>
          <Typography variant="h6">Outstanding amount</Typography>
        </CenteredBox>
      </BodyElement>

      <BodyElement xs={12} md={4}>
        <CenteredBox>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>£{paidAmount.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>Paid today</Typography>
        </CenteredBox>
      </BodyElement>

      <BodyElement xs={12}>
        <InvoicesTable invoices={invoices} setCurrentLink={setCurrentLink} handleSendInvoiceOpen={handleSendInvoiceOpen} />
      </BodyElement>
      <NewInvoice setNewLink={setNewLink} open={newInvoiceOpen} handleCreatedInvoiceOpen={handleCreatedInvoiceOpen} setOpen={setNewInvoiceOpen} handleClose={handleNewInvoiceClose} animationState={newInvoiceAnimationState} />
      <CreatedInvoice newLink={newLink} open={createdInvoiceOpen} setOpen={setCreatedInvoiceOpen} handleClose={handleCreatedInvoiceClose} animationState={createdInvoiceAnimationState} />
      <SendInvoice link={currentLink} open={sendInvoiceOpen} setOpen={setSendInvoiceOpen} handleClose={handleSendInvoiceClose} animationState={sendInvoiceAnimationState} />
    </React.Fragment>
  );
}

function InvoicesTable(props) {
  const rows = props.invoices;
  const columns = [
    { 
      field: 'status', headerName: 'Status', align: 'center', headerAlign: 'center', flex: 1,
    },
    { 
      field: 'expires', headerName: 'Expires', align: 'center', headerAlign: 'center', flex: 1,
    },
    { 
      field: 'amount', headerName: 'Amount', align: 'center', headerAlign: 'center', flex: 1,
      renderCell: (params) => {
        return (
          <div>{'£' + params.value.toFixed(2)}</div>
        );
      },
    },
    { 
      field: 'link', headerName: 'Link', align: 'center', headerAlign: 'center', flex: 1,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Button onClick={() => window.location.href = params.value} sx={{marginRight: '10px'}}><ExitToAppIcon /> Go</Button>
            <Button onClick={() => navigator.clipboard.writeText(params.value)} sx={{marginRight: '10px'}}><ContentCopyIcon /> Copy</Button>
            <Button onClick={() => {props.setCurrentLink(params.value); props.handleSendInvoiceOpen()}}><MailOutlineIcon /> Send</Button>
          </React.Fragment>
        );
      },
    }
  ];


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
        checkboxSelection={true}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 12, 20]}
        initialState={{
          pagination: {
            pageSize: 7,
          },
        }}/>
    </Box>
  );
}

function mapInvoices(paymentLinks) {
  return paymentLinks.map((link) => {
    return {
      id: link.checkoutId,
      status: link.transactionStatus,
      expires: (new Date(link.paymentLink.expiryDateTime)).toUTCString(),
      amount: link.approvedAmount.total,
      link: link.paymentLink.paymentLinkUrl
    }
  });
}