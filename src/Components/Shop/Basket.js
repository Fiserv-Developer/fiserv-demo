import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Box, Button, Divider, Modal, Paper, Table, TableBody, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Basket(props) {
  const theme = useTheme();
  const removeItem = (name) => {
    const basket = props.basket.filter((item) => item.name !== name );
    props.setBasket(basket);
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
      }}>
        <Paper
          sx={{ backgroundColor: theme.palette.primary.main, p: 4, color: theme.palette.text.main, }} 
          className={props.basketAnimationState} 
          onAnimationEnd={() => {
            if (props.basketAnimationState === "contract") {
              props.setBasketOpen(false);
            }}}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Shopping Basket
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your basket contains the following:
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', p: 2 }}>
            <Table>
              <TableBody>
                {props.basket.map((item) => 
                  <TableRow key={item.name}>
                    <TableCell><img width='60px' alt={item.name + " product photo"} src={ "../products/" + item.name.toLowerCase() + ".jpeg" } /></TableCell>
                    <TableCell><Typography sx={{color: theme.palette.text.main}}>{item.name}</Typography></TableCell>
                    <TableCell><Typography sx={{color: theme.palette.text.main}}>£{item.value}</Typography></TableCell>
                    <TableCell><Typography sx={{color: theme.palette.text.main}}>{item.quantity}</Typography></TableCell>
                    <TableCell><Button onClick={() => removeItem(item.name)} sx={{color: theme.palette.text.main}}><PlaylistRemoveIcon /></Button></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <Typography sx={{ textAlign: 'right'}}>Total: £{basketTotal}</Typography>
          <Divider sx={{ borderColor: theme.palette.primary.main, margin: 4}}/>
          <Button 
            sx={{color: theme.palette.orange.main, left: '10px', bottom: '10px', position: 'fixed'}}
            onClick={props.handleBasketClose}>
            <ArrowBackIcon /> Continue Shopping
          </Button>
          {/* TODO only work if there are items in basket */}
          <Button 
            sx={{color: theme.palette.white.main, backgroundColor: theme.palette.orange.main, right: '10px', bottom: '10px', position: 'fixed'}}
            onClick={props.handleCheckoutOpen}>
            <ShoppingCartCheckoutIcon /> Checkout
          </Button>
        </Paper>
      </Box>
    </Modal>
  )
}