import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Modal, Paper, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Checkout(props) {
  const theme = useTheme();

  const backToBasket = () => {
    props.handleCheckoutClose();
    props.handleBasketOpen();
  }

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
            }}}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Shipping
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please enter your shipping details:
          </Typography>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
              />
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
          <Button 
            sx={{color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main, right: '10px', bottom: '10px', position: 'fixed'}}
            onClick={() => { props.handleProcessingOpen(); props.checkout(); }}>
            <PaymentIcon /> Pay
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}