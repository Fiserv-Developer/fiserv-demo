import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BodyElement from '../Components/BodyElement';
import { CenteredBox } from '../Components/CenteredBox';
import CreatedInvoice from '../Components/Invoices/CreatedInvoice';
import { InvoicesTable } from '../Components/Invoices/InvoicesTable';
import NewInvoice from '../Components/Invoices/NewInvoice';
import SendInvoice from '../Components/Invoices/SendInvoice';
import Processing from '../Components/Shop/Processing';
import { Title } from '../Components/Title';
import { config, resources, state } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';

export default function Invoices() {
  const theme = useTheme();
  const baseUrl = config.baseUrl;
  const apiKey = getValueOrDefault(config.apiKey, config.defaultApiKey);
  const secretKey = getValueOrDefault(config.secretKey, config.defaultSecretKey);

  const [linkIds, setLinkIds] = useState(getValueOrDefault(state.linkIds, []));
  const [invoices, setInvoices] = useState([]);
  const [activeLinks, setActiveLinks] = useState(0);
  const [outstandingAmount, setOutstandingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [newLink, setNewLink] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // modal config for 'new invoice'
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

  // modal config for 'processing' (on new invoice creation)
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

  // modal config for a successful 'created invoice'
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

  // modal config for 'send invoice'
  const [sendInvoiceOpen, setSendInvoiceOpen] = useState(false);
  const [sendInvoiceAnimationState, setSendInvoiceAnimationState] = useState("expand");
  const handleSendInvoiceOpen = () => {
    setSendInvoiceAnimationState("expand");
    setSendInvoiceOpen(true);
  }
  const handleSendInvoiceClose = () => {
    setSendInvoiceAnimationState("contract");
  }

  // for calculating the outstanding invoice amount from active links
  const getOustandingAmount = (invoices) => {
    return invoices
      .filter((invoice) => invoice.status === 'INITIATED' || invoice.status === 'WAITING')
      .reduce((partialSum, invoice) => partialSum + parseFloat(invoice.amount), 0);
  }

  // for calculating the paid invoice amount from approved links
  const getPaidAmound = (invoices) => {
    return invoices
      .filter((invoice) => invoice.status === 'APPROVED')
      .reduce((partialSum, invoice) => partialSum + parseFloat(invoice.amount), 0);
  }

  // for taking a 'link' returned by the API and converting it to an internal invoice model
  const mapInvoice = (link) => {
    return {
      id: link.checkoutId,
      active: link.paymentLink.active,
      status: link.transactionStatus,
      expires: link.paymentLink.expiryDateTime,
      amount: link.approvedAmount.total,
      link: link.paymentLink.paymentLinkUrl,
    };
  }

  // Update local storage if links state changes
  useEffect(() => localStorage.setItem(state.linkIds, JSON.stringify(linkIds)), [linkIds]);

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
                if (i.find((invoice) => invoice.id === linkId)) { // we've already loaded this link (in case this is triggered more than once)
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
            .catch(rejected => setError(true)));
      })
    }
  }, [apiKey, linkIds, baseUrl, secretKey]);

  return (
    <Grid container spacing={3} sx={{padding: '30px'}}>
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

      {/* modals */}

      <NewInvoice 
        baseUrl={baseUrl} apiKey={apiKey} secretKey={secretKey} 
        setNewLink={setNewLink} 
        open={newInvoiceOpen} setOpen={setNewInvoiceOpen} handleClose={handleNewInvoiceClose}
        handleCreatedInvoiceOpen={handleCreatedInvoiceOpen} 
        handleProcessingOpen={handleProcessingOpen}
        handleProcessingClose={handleProcessingClose}
        animationState={newInvoiceAnimationState}
        linkIds={linkIds} />

      <Processing 
        open={processingOpen} 
        setOpen={setProcessingOpen} 
        handleClose={handleProcessingClose} 
        animationState={processingAnimationState} />

      <CreatedInvoice 
        newLink={newLink} setLinkIds={setLinkIds}
        open={createdInvoiceOpen} setOpen={setCreatedInvoiceOpen} handleClose={handleCreatedInvoiceClose} 
        animationState={createdInvoiceAnimationState} />
      
      <SendInvoice 
        link={currentLink} 
        open={sendInvoiceOpen} setOpen={setSendInvoiceOpen} handleClose={handleSendInvoiceClose} 
        animationState={sendInvoiceAnimationState} />
    </Grid>
  );
}