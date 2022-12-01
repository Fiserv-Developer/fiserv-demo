import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Modal, Paper, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Title } from "../Title";

export default function Checkout(props) {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [valid, setValid] = useState(false);

  const backToBasket = () => {
    props.handleCheckoutClose();
    props.handleBasketOpen();
  }

  useEffect(() => {
    if (name !== '' && addressLine1 !== '' && city !== '' && zip !== '' && country !== '' ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [name, addressLine1, city, zip, country]);

  return (
    <Modal
      open={props.open}
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
          className={props.checkoutAnimationState} 
          onAnimationEnd={() => {
            if (props.checkoutAnimationState === "contract") {
              props.setCheckoutOpen(false);
            }
          }}
        >
          <Title icon={<LocalShippingIcon />} primary="Shipping" secondary="Please enter your shipping details"></Title>
          <Divider />
          <br />
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
          <Divider sx={{ borderColor: theme.palette.background.default, margin: 4}}/>
          <Button 
            sx={{ left: '10px', bottom: '10px', position: 'fixed'}}
            onClick={backToBasket}>
            <ArrowBackIcon /> Back
          </Button>
          <Button disabled={!valid}
            sx={{
              color: theme.palette.primary.contrastText, 
              backgroundColor: theme.palette.primary.main, 
              right: '10px', bottom: '10px', position: 'fixed',
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
        </Paper>
      </Box>
    </Modal>
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