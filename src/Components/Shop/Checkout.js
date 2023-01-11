import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { Button, Checkbox, FormControlLabel, Grid, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from "../Title";

export default function Checkout(props) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const shippingValid = name !== '' && addressLine1 !== '' && city !== '' && zip !== '' && country !== '';

  const backToBasket = () => {
    props.handleClose();
    props.handleBasketOpen();
  }

  const modalTitle = (
    <Title icon={<LocalShippingIcon />} primary="Shipping" secondary="Please enter your shipping details" />
  );

  const modalContent = (
    <Grid container item spacing={3}>
      <Grid item xs={12} sm={12}>
        <AddressInput name="name" label="Name" auto="name" required={true}
          stateValue={name} updateState={setName} />
      </Grid>
      <Grid item xs={12}>
        <AddressInput name="address1" label="Address Line 1" auto="shipping address-line1" required={true}
          stateValue={addressLine1} updateState={setAddressLine1} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddressInput name="city" label="City" stateValue={city} auto="shipping address-level2" required={true}
          updateState={setCity} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddressInput name="state" label="State / Region / Province" required={false} 
          stateValue={state} updateState={setState} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddressInput name="zip" label="Zip / Postal Code" auto="shipping postal-code" required={true}
          stateValue={zip} updateState={setZip} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AddressInput name="country" label="Country" required={true} auto="shipping country"
          stateValue={country} updateState={setCountry} />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </Grid>
    </Grid>
  );

  const modalButtons = (
    <React.Fragment>
      <Button 
        sx={{
          left: '20px', 
          position: 'absolute',
        }}
        onClick={backToBasket}
      >
        <ArrowBackIcon /> Back
      </Button>
      <Button 
        disabled={!shippingValid}
        sx={{
          color: theme.palette.primary.contrastText, 
          backgroundColor: theme.palette.primary.main, 
          '&:hover': {
            backgroundColor: theme.palette.primary.light, 
          }
        }}
        onClick={() => { 
          props.handleProcessingOpen(); 
          props.checkout(); 
        }}
      >
        <PaymentIcon /> Pay
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

function AddressInput(props) {
  return (
    <TextField
      required={props.required} fullWidth
      id={props.name}
      name={props.name}
      label={props.label}
      autoComplete={props.auto}
      variant="standard"
      value={props.stateValue}
      onChange={(e) => props.updateState(e.target.value)}
    />
  );
}