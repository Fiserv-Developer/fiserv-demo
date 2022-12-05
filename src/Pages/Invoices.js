import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import BodyElement from '../Components/BodyElement';
import { CenteredBox } from '../Components/CenteredBox';
import Error from '../Components/Error';
import CreatedInvoice from '../Components/Invoices/CreatedInvoice';
import NewInvoice from '../Components/Invoices/NewInvoice';
import SendInvoice from '../Components/Invoices/SendInvoice';
import Placeholder from '../Components/Placeholder';
import Processing from '../Components/Shop/Processing';
import { Title } from '../Components/Title';
import { config, resources, state } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';

export default function Invoices() {
  const theme = useTheme();
  const baseUrl = config.nonProdQaBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");

  const [linkIds, setLinkIds] = useState(getValueOrDefault(state.linkIds, []));
  const [invoices, setInvoices] = useState([]);
  const [activeLinks, setActiveLinks] = useState(0);
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [newLink, setNewLink] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // modals
  const [newInvoiceOpen, setNewInvoiceOpen] = useState(false);
  const [newInvoiceAnimationState, setNewInvoiceAnimationState] = useState("expand");
  const handleNewInvoiceOpen = () => {
    setNewLink("");
    setNewInvoiceAnimationState("expand");
    setNewInvoiceOpen(true);
  }
  const handleNewInvoiceClose = () => {
    setNewInvoiceAnimationState("contract");
  }

  // processing modal
  const [processingOpen, setProcessingOpen] = useState(false);
  const [processingAnimationState, setProcessingAnimationState] = useState("expand");
  const handleProcessingOpen = () => {
    setNewInvoiceAnimationState("contract");
    setProcessingAnimationState("expand");
    setProcessingOpen(true);
  }
  const handleProcessingClose = () => {
    setProcessingAnimationState("contract"); 
  }

  const [createdInvoiceOpen, setCreatedInvoiceOpen] = useState(false);
  const [createdInvoiceAnimationState, setCreatedInvoiceAnimationState] = useState("expand");
  const handleCreatedInvoiceOpen = () => {
    setNewInvoiceAnimationState("contract");
    setCreatedInvoiceAnimationState("expand");
    setCreatedInvoiceOpen(true);
  }
  const handleCreatedInvoiceClose = () => {
    setCreatedInvoiceAnimationState("contract");
    setLinkIds([...linkIds, newLink.id]);
  }

  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false);
  const [sendInvoiceAnimationState, setSendInvoiceAnimationState] = useState("expand");
  const handleSendInvoiceOpen = () => {
    setSendInvoiceAnimationState("expand");
    setSendInvoiceOpen(true);
  }
  const handleSendInvoiceClose = () => {
    setSendInvoiceAnimationState("contract");
  }

  // Load known links
  useEffect(() => {  
    setLoading(true);
    setError(false);

    if (linkIds.length === 0) {
      setLoading(false);

    } else {
      linkIds.forEach((linkId) => {
        return withSignature(apiKey, secretKey,
          "GET", 
          "",
          (options) => fetchWithRetry(`${baseUrl}/${resources.paymentLinks}/${linkId}`, options)
            .then(data => {
              setInvoices((i) => {
                if (i.find((invoice) => invoice.id === linkId)) {
                  if (i.length === linkIds.length) {
                    setLoading(false);
                    setActiveLinks(i.filter((invoice) => invoice.status === 'INITIATED' || invoice.status === 'WAITING').length);
                    setOutstandingAmount(getOustandingAmount(i));
                    setPaidAmount(getPaidAmound(i));
                  }
                  return i;
                } else {
                  const updatedInvoices = [...i, mapInvoice(data)];
                  if (updatedInvoices.length === linkIds.length) {
                    setLoading(false);
                    setActiveLinks(updatedInvoices.filter((invoice) => invoice.status === 'INITIATED' || invoice.status === 'WAITING').length);
                    setOutstandingAmount(getOustandingAmount(updatedInvoices));
                    setPaidAmount(getPaidAmound(updatedInvoices));
                  }
                  return updatedInvoices;
                }
              })
            })
            .catch(rejected => setError(true)))
      })
    }
  }, [apiKey, linkIds, baseUrl, secretKey]);

  // Update local storage if links state changes
  useEffect(() => localStorage.setItem(state.linkIds, JSON.stringify(linkIds)), [linkIds]);

  const getOustandingAmount = (invoices) => {
    return invoices
      .filter((invoice) => invoice.status === 'INITIATED' || invoice.status === 'WAITING')
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
        <InvoicesTable error={error} loading={loading} invoices={invoices} setCurrentLink={setCurrentLink} handleSendInvoiceOpen={handleSendInvoiceOpen} />
      </BodyElement>

      <NewInvoice 
        baseUrl={baseUrl} apiKey={apiKey} secretKey={secretKey} 
        setNewLink={setNewLink} 
        open={newInvoiceOpen} setOpen={setNewInvoiceOpen} handleClose={handleNewInvoiceClose}
        handleCreatedInvoiceOpen={handleCreatedInvoiceOpen} 
        handleProcessingOpen={handleProcessingOpen}
        handleProcessingClose={handleProcessingClose}
        animationState={newInvoiceAnimationState}
        linkIds={linkIds} setLinkIds={setLinkIds} />

      <Processing 
        open={processingOpen} 
        setOpen={setProcessingOpen} 
        handleClose={handleProcessingClose} 
        animationState={processingAnimationState} />

      <CreatedInvoice 
        newLink={newLink} 
        open={createdInvoiceOpen} setOpen={setCreatedInvoiceOpen} handleClose={handleCreatedInvoiceClose} 
        animationState={createdInvoiceAnimationState} />
      
      <SendInvoice 
        link={currentLink} 
        open={sendInvoiceOpen} setOpen={setSendInvoiceOpen} handleClose={handleSendInvoiceClose} 
        animationState={sendInvoiceAnimationState} />
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
}

function mapInvoice(link) {
  return {
    id: link.checkoutId,
    status: link.transactionStatus,
    expires: (new Date(link.paymentLink.expiryDateTime)).toUTCString(),
    amount: link.approvedAmount.total,
    link: link.paymentLink.paymentLinkUrl
  }
}