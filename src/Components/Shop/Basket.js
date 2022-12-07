import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Divider, Grid, Table, TableBody, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from '../Title';

export default function Basket(props) {
  const theme = useTheme();
  const [checkoutEnabled, setCheckoutEnabled] = useState(true);

  useEffect(() => {
    if (props.basket.length > 0) {
      setCheckoutEnabled(true);
    } else {
      setCheckoutEnabled(false);
    }
  }, [props.basket])

  const removeItem = (name) => {
    const basket = props.basket.filter((item) => item.name !== name );
    props.setBasket(basket);
  };

  const basketTotal = props.basket.reduce((partialSum, item) => partialSum + (parseFloat(item.value) * item.quantity), 0).toFixed(2);

  const modalTitle = (
    <Title icon={<ShoppingBasketIcon />} primary="Shopping Basket" secondary="Your basket contains the following:" />
  );

  const modalContent = props.basket.length > 0 ? (
    <React.Fragment>
      <Table sx={{tableLayout: 'fixed'}}>
        <TableBody>
          {props.basket.map((item) => 
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <img width='60px' alt={item.name + " product photo"} src={ "../shop/products/" + item.image } />
              </Grid>
              <Grid item xs={4}><Typography sx={{ textAlign: 'center', height: '40px', lineHeight: '40px' }}>{item.name}</Typography></Grid>
              <Grid item xs={2}><Typography sx={{ height: '40px', lineHeight: '40px' }}>£{item.value}</Typography></Grid>
              <Grid item xs={2}><Typography sx={{ textAlign: 'right', height: '40px', lineHeight: '40px' }}>x{item.quantity}</Typography></Grid>
              <Grid item xs={2}><Button onClick={() => removeItem(item.name)}><PlaylistRemoveIcon /></Button></Grid>
              <Grid item xs={12}><Divider sx={{ marginBottom: 2 }} /></Grid>
            </Grid>
          )}
        </TableBody>
      </Table>
      <br />
      <Typography sx={{ textAlign: 'right'}}>Total: £{basketTotal}</Typography>
    </React.Fragment>
  ) : (
    <Typography variant="h6" sx={{textAlign: 'center'}}>Your basket is empty.</Typography>
  );

  const modalButtons = (
    <React.Fragment>
      <Button 
        sx={{
          left: '20px', 
          position: 'absolute'
        }}
        onClick={props.handleClose}>
        <ArrowBackIcon /> Continue Shopping
      </Button>
      <Button
        disabled={!checkoutEnabled}
        sx={{
          color: theme.palette.primary.contrastText, 
          backgroundColor: theme.palette.primary.main, 
          '&:hover': {
            backgroundColor: theme.palette.primary.light 
          },
        }}
        onClick={props.handleCheckoutOpen}
      >
        <ShoppingCartCheckoutIcon /> Checkout
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