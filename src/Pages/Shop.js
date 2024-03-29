import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { CenteredBox } from '../Components/CenteredBox';
import Basket from '../Components/Shop/Basket';
import Checkout from '../Components/Shop/Checkout';
import Processing from '../Components/Shop/Processing';
import Product from '../Components/Shop/Product';
import { config } from '../Config/constants';
import { products } from '../Config/data';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';

export default function Shop(props) {
  const theme = useTheme();
  const [basket, setBasket] = useState([]);
  const baseUrl = config.baseUrl;
  const apiKey = getValueOrDefault(config.apiKey, config.defaultApiKey);
  const secretKey = getValueOrDefault(config.secretKey, config.defaultSecretKey);

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

  const checkout = () => {
    const basketTotal = basket.reduce((partialSum, item) => partialSum + (parseFloat(item.value) * item.quantity), 0).toFixed(2);
    const url = baseUrl + "/checkouts";
    const data = {
      "storeId": "72305408",
      "transactionType": "SALE",
      "transactionAmount": {
        "currency": "EUR",
        "total": parseFloat(basketTotal)
      },
      "checkoutSettings": {
        "locale": null,
        "preSelectedPaymentMethod": null,
        "webHooksUrl": null,
        "redirectBackUrls": {
             "successUrl": "https://demo.fiserv.dev/checkout-success", // todo improve callback flow
             "failureUrl": "https://demo.fiserv.dev/checkout-failure"
        }
      },
    };
  
    withSignature(apiKey, secretKey,
      "POST",
      data,
      (options) => fetchWithRetry(url, options)
        .then(data => window.location.href = data.checkout.redirectionUrl)
        .catch(rejected => {
          window.location.href = "/checkout-failure"; // todo improve callback flow
        }));
  }

  const addItem = (product) => {
    setBasket([ ...basket, {image: product.image, name: product.name, value: product.value, quantity: 1}]);
    props.setSnackbarText("Item added to basket");
    props.setSnackbarOpen(true);
  };

  const increaseQuantity = (name) => {
    setBasket(basket.map((item) => {
      if(item.name === name) {
        return {
          ...item,
          quantity: item.quantity + 1
        };
      } else {
        return item;
      }
    }));
    props.setSnackbarText("Item added to basket");
    props.setSnackbarOpen(true);
  };

  const decreaseQuantity = (name) => {
    const decreased = basket.map((item) => {
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
    setBasket(filtered);
    props.setSnackbarText("Item removed from basket");
    props.setSnackbarOpen(true);
  };

  const isInBasket = (name) => {
    const quantity = basket.filter((item) => item.name === name).length;
    return quantity > 0;
  };
  
  const countInBasket = (name) => {
    return basket.filter((item) => item.name === name)[0].quantity;
  };

  useEffect(() => {
    const all = [...products.coffee, ...products.art].map((product) => product.image);
    all.forEach((picture) => {
      const img = new Image();
      img.src = picture.fileName;
    });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: theme.palette.background.paper, position: 'fixed', top: 0, left: 0, width: '100%', height: '56px', boxShadow: '0 2px ' + theme.palette.text.secondary}}>
        <Typography variant="h5" sx={{ lineHeight: '56px', height: '56px', marginLeft: '20px', color: theme.palette.text.primary, fontWeight: '200'}}>
          <b>b</b>rush & <b>b</b>ean
        </Typography>
        <IconButton 
          sx={{ position: 'absolute', right: '15px', top: '12px' }}
          onClick={handleBasketOpen}
        >
          <Badge badgeContent={basket.length} color="primary">
            <ShoppingBasketIcon sx={{ color: theme.palette.text.primary }} />
          </Badge>
        </IconButton>
      </Box>

      <Grid container spacing={0} sx={{ position: 'relative', marginTop: '56px' }}>
        {/* banner */}
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: '500px', position: 'relative' }}>
            <img alt="shop banner" src="../shop/banner.jpeg" style={{opacity: '0.5', width: '100%', height: '500px', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center' }}>
              <Typography variant="h1"><b>b</b>rush & <b>b</b>ean</Typography>
              <Typography variant="p">Expert coffee roasters and art curators</Typography>
            </Box>
          </Box>
        </Grid>

        {/* intro text */}
        <Grid item xs={12} sx={{position: 'relative', paddingTop: '30px'}}>
          <CenteredBox>
            <Typography variant="h6" sx={{fontWeight: '200', fontStyle: 'italic'}}>
              Signature coffee beans, roasted in-house.<br />
              Hand-picked artworks to appreciate while sipping your morning coffee.
            </Typography>
          </CenteredBox>
        </Grid>

        {/* products */}
        <Grid container rowSpacing={4} columnSpacing={0}>

          {/* beans */}
          <Grid item xs={12} md={6} lg={6} xl={4} sx={{position: 'relative' }}>
            <img alt="beans banner" src="../shop/beans-table.jpeg" style={{opacity: '0.7', width: '100%', height: '100%', objectFit: 'cover'}}/>
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center' }}>
              <Typography variant="h2" sx={{ color: theme.palette.primary.contrastText }}>our <b>b</b>eans</Typography>
              <Typography variant="p" sx={{ color: theme.palette.primary.contrastText }}>Premium coffee beans, roasted and infused by us</Typography>
            </Box>
          </Grid>
          {products.coffee.map((p) => <Product product={p} addItem={addItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} isInBasket={isInBasket} countInBasket={countInBasket} />)}
          
          {/* art */}
          <Grid item xs={12} md={6} lg={6} xl={4} sx={{position: 'relative' }}>
            <img alt="brush banner" src="../shop/brush.jpeg" style={{opacity: '0.7', width: '100%', height: '100%', objectFit: 'cover'}}/>
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center' }}>
              <Typography variant="h2" sx={{ color: theme.palette.primary.contrastText }}>our <b>b</b>rush</Typography>
              <Typography variant="p" sx={{ color: theme.palette.primary.contrastText }}>Unique artwork, curated and created by us</Typography>
            </Box>
          </Grid>
          {products.art.map((p) => <Product product={p} addItem={addItem} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} isInBasket={isInBasket} countInBasket={countInBasket} />)}
        </Grid>

        {/* outtro text */}
        <Grid item xs={12} sx={{position: 'relative', paddingTop: '30px'}}>
          <CenteredBox>
            <Typography variant="h6" sx={{fontWeight: '200', fontStyle: 'italic'}}>Didn't find what you're looking for? <b>Get in touch!</b></Typography>
          </CenteredBox>
        </Grid>


        {/* footer */}
        <Grid 
          item xs={12} 
          sx={{marginTop: '40px', padding: '20px', height: '200px', borderTop: '1px solid ' + theme.palette.text.secondary, backgroundColor: theme.palette.background.paper}}
        >
          <CenteredBox>
            <Typography sx={{ textAlign: 'center' }}>© A <b>completely</b> ficticious company, to be used as an example only.</Typography>
          </CenteredBox>
        </Grid>
      </Grid>

      {/* modals */}
      <Basket open={basketOpen} basket={basket} setBasket={setBasket} handleCheckoutOpen={handleCheckoutOpen} setOpen={setBasketOpen} handleClose={handleBasketClose} animationState={basketAnimationState} />
      <Checkout open={checkoutOpen} basket={basket} setOpen={setCheckoutOpen} handleClose={handleCheckoutClose} handleBasketOpen={handleBasketOpen} animationState={checkoutAnimationState} checkout={checkout} handleProcessingOpen={handleProcessingOpen}/>
      <Processing open={processingOpen} setOpen={setProcessingOpen} handleClose={handleProcessingClose} animationState={processingAnimationState} />
    </React.Fragment>
  );
}