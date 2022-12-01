import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, Grid, Modal, Paper, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { config } from '../../Config/constants';
import { fetchWithRetry, withSignature } from '../../Config/utils';
import { Title } from '../Title';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function NewInvoice(props) {
  const theme = useTheme();
  const baseUrl = config.nonProdBaseUrl;
  const [valid, setValid] = useState();
  const [failed, setFailed] = useState(false);

  // form fields
  const [storeId, setStoreId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const create = () => {
    const url = baseUrl + "/payment-links";
    const data = {
      "storeId": "72305408",
      "transactionType": "SALE",
      "transactionAmount": {
        "currency": "EUR",
        "total": 100
      },
    };
 
    // withSignature(
    //   "POST",
    //   data,
    //   (options) => fetchWithRetry(url, options)
    //     .then(data => window.location.href = data.checkout.redirectionUrl)
    //     .catch(rejected => {
    //       window.location.href = "/shop?failure=true"; // todo improve callback flow
    //     }));

    props.setNewLink("https://www.checkout-lane.com/pl/dBpYUi");
    props.handleCreatedInvoiceOpen();
    setStoreId("");
    setTransactionType("");
    setCurrency("");
    setAmount("");
  }

  useEffect(() => {
    if (storeId !== '' && transactionType !== '' && currency !== '' && amount !== '' ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [storeId, transactionType, currency, amount]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleNewInvoiceClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        boxShadow: 24,
        p: 4,
      }}>
        <Paper
          sx={{ p: 4 }} 
          className={props.newInvoiceAnimationState} 
          onAnimationEnd={() => {
            if (props.newInvoiceAnimationState === "contract") {
              props.setNewInvoiceOpen(false);
            }}}
        >
          <Title icon={<AddBoxIcon />} primary="Create Invoice" secondary="Enter the required fields below"></Title>
          <Divider />
          <br />
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required fullWidth
                id="storeId"
                name="storeId"
                label="Store ID"
                variant="standard"
                value={storeId}
                onChange={(e) => setStoreId(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required fullWidth
                id="type"
                name="type"
                label="Transaction Type"
                variant="standard"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth
                id="currency"
                name="currency"
                label="Currency"
                variant="standard"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth
                id="amount"
                name="amount"
                label="Amount"
                variant="standard"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}/>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: theme.palette.background.default, margin: 4}}/>
          <Button 
            sx={{color: theme.palette.primary.main, left: '10px', bottom: '10px', position: 'fixed'}}
            onClick={props.handleNewInvoiceClose}>
            <ArrowBackIcon /> Cancel
          </Button>

          <Button 
            disabled={!valid}
            sx={{
              color: theme.palette.primary.contrastText, 
              backgroundColor: theme.palette.primary.main, 
              '&:hover': {
                backgroundColor: theme.palette.primary.light 
              },
              right: '10px', bottom: '10px', position: 'fixed'
            }}
            onClick={create}>
            <AddIcon /> Create
          </Button>
        </Paper>
      </Box>
    </Modal>
  )
}