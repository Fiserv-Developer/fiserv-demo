import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from '../Title';

export default function NewInvoice(props) {
  const theme = useTheme();
  const [valid, setValid] = useState();

  // form fields
  const [storeId, setStoreId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const create = () => {
    // todo eventually do an actual API call
    props.setNewLink("https://www.checkout-lane.com/pl/dBpYUi");
    props.handleCreatedInvoiceOpen();
    setStoreId("");
    setTransactionType("");
    setCurrency("");
    setAmount("");
  }

  useEffect(() => {
    if (storeId !== '' && transactionType !== '' && currency !== '' && amount !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [storeId, transactionType, currency, amount]);

  const modalTitle = (
    <Title icon={<AddBoxIcon />} primary="Create Invoice" secondary="Enter the required fields below" />
  );

  const modalContent = (
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
  );

  const modalButtons = (
    <React.Fragment>
      <Button 
        sx={{
          color: theme.palette.primary.main, 
          left: '20px', 
          position: 'absolute' 
        }}
        onClick={props.handleClose}>
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
        }}
        onClick={create}
      >
        <AddIcon /> Create
      </Button>
    </React.Fragment>
  );

  return (
    <ResponsiveModal 
      title={modalTitle} 
      content={modalContent} 
      buttons={modalButtons} 
      open={props.open} 
      setOpen={props.setOpen} 
      animationState={props.animationState} />
  );
}