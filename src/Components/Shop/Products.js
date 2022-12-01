import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { products } from "../../Config/data";
import BodyElement from "../BodyElement";
import { Title } from '../Title';
import Basket from "./Basket";
import Checkout from './Checkout';
import Processing from './Processing';

export default function Products(props) {

  // basket modal
  const [basketOpen, setBasketOpen] = useState(false);
  const [basketAnimationState, setBasketAnimationState] = useState("expand");
  const handleBasketOpen = () => {
    setBasketAnimationState("expand");
    setBasketOpen(true);
  }
  const handleBasketClose = () => {
    setBasketAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  // checkout modal
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutAnimationState, setCheckoutAnimationState] = useState("expand");
  const handleCheckoutOpen = () => {
    setBasketAnimationState("contract");
    setCheckoutAnimationState("expand");
    setCheckoutOpen(true);
  }
  const handleCheckoutClose = () => {
    setCheckoutAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  // processing modal
  const [processingOpen, setProcessingOpen] = useState(false);
  const [processingAnimationState, setProcessingAnimationState] = useState("expand");
  const handleProcessingOpen = () => {
    setCheckoutAnimationState("contract");
    setProcessingAnimationState("expand");
    setProcessingOpen(true);
  }
  const handleProcessingClose = () => {
    setProcessingAnimationState("contract"); // the actual close is done on animation end (see below)
  }

  return (
    <React.Fragment>
      <BasketInfo
        basket={props.basket} handleBasketOpen={handleBasketOpen} />
      <BodyElement xs={12} md={12} lg={12}>
        <Title icon={<ShoppingBasketIcon />} primary="Shop" secondary="Select your favourite products and purchase them using our streamlined Checkout flow" />
      </BodyElement>
      {products.map((product) => <Product key={product.name} basket={props.basket} setBasket={props.setBasket} product={product} />)}
      <Basket open={basketOpen} basket={props.basket} setBasket={props.setBasket} handleCheckoutOpen={handleCheckoutOpen} setBasketOpen={setBasketOpen} handleBasketClose={handleBasketClose} basketAnimationState={basketAnimationState} />
      <Checkout open={checkoutOpen} basket={props.basket} setCheckoutOpen={setCheckoutOpen} handleCheckoutClose={handleCheckoutClose} handleBasketOpen={handleBasketOpen} checkoutAnimationState={checkoutAnimationState} checkout={props.checkout} handleProcessingOpen={handleProcessingOpen}/>
      <Processing open={processingOpen} setProcessingOpen={setProcessingOpen} handleProcessingClose={handleProcessingClose} processingAnimationState={processingAnimationState} />
    </React.Fragment>
  );
}

function Product(props) {
  const addItem = (product) => {
    props.setBasket([ ...props.basket, {name: product.name, value: product.value, quantity: 1}]);
  };

  const increaseQuantity = (name) => {
    props.setBasket(props.basket.map((item) => {
      if(item.name === name) {
        return {
          name: item.name,
          value: item.value,
          quantity: item.quantity + 1
        };
      } else {
        return item;
      }
    }));
  };

  const decreaseQuantity = (name) => {
    const decreased = props.basket.map((item) => {
      if(item.name === name) {
        return {
          name: item.name,
          value: item.value,
          quantity: item.quantity - 1
        };
      } else {
        return item;
      }
    });

    const filtered = decreased.filter((item) => item.quantity > 0);
    props.setBasket(filtered);
  };

  const basketHasItem = (name) => {
    const quantity = props.basket.filter((item) => item.name === name).length;
    return quantity > 0;
  };

  const basketItemQuantity = (name) => {
    return props.basket.filter((item) => item.name === name)[0].quantity;
  };

  const buttons = basketHasItem(props.product.name) ? 
    (
      <Box sx={{display: 'flex', margin: '0 auto'}}>
        <Button onClick={() => decreaseQuantity(props.product.name)}>-</Button>
        <Typography sx={{lineHeight: '40px', height: '40px'}}>{basketItemQuantity(props.product.name)}</Typography>
        <Button onClick={() => increaseQuantity(props.product.name)}>+</Button>
      </Box>
    )
    :
    (
      <Button onClick={() => addItem(props.product)}>Add to basket</Button>
    );

  return (
    <BodyElement xs={12} md={4} lg={3}>
      <img alt={props.product.name + " product photo"} src={ "../products/" + props.product.name.toLowerCase() + ".jpeg" } />
      <p><b>{props.product.name}</b></p>
      <p>£{props.product.value}</p>
      {buttons}
    </BodyElement>
  );
} 

// TODO make this look good on mobile
function BasketInfo(props) {
  const items = props.basket.reduce((partialSum, item) => partialSum + item.quantity, 0);

  if (items > 0) {
    return (
      <Box sx={{ position: 'absolute', right: '15px', top: '15px' }}>
        <Paper>
          <IconButton onClick={props.handleBasketOpen}>
            <Badge badgeContent={items} color="primary">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Paper>
      </Box>
    );
  } else {
    return (null);
  }
}

