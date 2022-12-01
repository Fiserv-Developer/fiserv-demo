import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Button, Divider, Modal, Paper, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Title } from '../Title';

export default function Basket(props) {
  const theme = useTheme();
  const [checkoutEnabled, setCheckoutEnabled] = useState(true);

  const removeItem = (name) => {
    const basket = props.basket.filter((item) => item.name !== name );
    props.setBasket(basket);
    if (basket.length < 1) {
      setCheckoutEnabled(false);
    }
  };

  const basketTotal = props.basket.reduce((partialSum, item) => partialSum + (parseFloat(item.value) * item.quantity), 0).toFixed(2);

  return (
    <Modal
      open={props.open}
      onClose={props.handleBasketClose}
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
      }}
      >
        <Paper
          sx={{ p: 4 }} 
          className={props.basketAnimationState} 
          onAnimationEnd={() => {
            if (props.basketAnimationState === "contract") {
              props.setBasketOpen(false);
            }}}
        >
          <Title icon={<ShoppingBasketIcon />} primary="Shopping Basket" secondary="Your basket contains the following:"></Title>
          <Divider />
          <br />
          <Box sx={{ width: '100%', display: 'flex', p: 2 }}>
            <Table>
              <TableBody>
                {props.basket.map((item) => 
                  <TableRow key={item.name}>
                    <TableCell><img width='60px' alt={item.name + " product photo"} src={ "../products/" + item.name.toLowerCase() + ".jpeg" } /></TableCell>
                    <TableCell><Typography>{item.name}</Typography></TableCell>
                    <TableCell><Typography>£{item.value}</Typography></TableCell>
                    <TableCell><Typography>{item.quantity}</Typography></TableCell>
                    <TableCell><Button onClick={() => removeItem(item.name)}><PlaylistRemoveIcon /></Button></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <Typography sx={{ textAlign: 'right'}}>Total: £{basketTotal}</Typography>
          <Divider sx={{ borderColor: theme.palette.background.default, margin: 4}}/>
          <Button 
            sx={{
              color: theme.palette.primary.main, 
              left: '10px', 
              bottom: '10px', 
              position: 'fixed'
            }}
            onClick={props.handleBasketClose}>
            <ArrowBackIcon /> Continue Shopping
          </Button>
          {/* TODO only work if there are items in basket */}
          <Button
            disabled={!checkoutEnabled}
            sx={{
              color: theme.palette.primary.contrastText, 
              backgroundColor: theme.palette.primary.main, 
              '&:hover': {
                backgroundColor: theme.palette.primary.light 
              },
              right: '10px', 
              bottom: '10px', 
              position: 'fixed'
            }}
            onClick={props.handleCheckoutOpen}
          >
            <ShoppingCartCheckoutIcon /> Checkout
          </Button>
        </Paper>
      </Box>
    </Modal>
  )
}