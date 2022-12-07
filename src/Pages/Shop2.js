import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import BodyElement from '../Components/BodyElement';
import { CenteredBox } from '../Components/CenteredBox';
import { config } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';
import StarIcon from '@mui/icons-material/Star';
import { products2 } from '../Config/data';
import Basket from '../Components/Shop/Basket';
import Checkout from '../Components/Shop/Checkout';
import Processing from '../Components/Shop/Processing';

export default function Shop2() {
  const theme = useTheme();
  const [basket, setBasket] = useState([]);
  const baseUrl = config.nonProdIntBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");

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

  const basketHasItem = (name) => {
    const quantity = basket.filter((item) => item.name === name).length;
    return quantity > 0;
  };

  const basketItemQuantity = (name) => {
    return basket.filter((item) => item.name === name)[0].quantity;
  };

  const product = (product) => {
    const addItem = (product) => {
      setBasket([ ...basket, {name: product.name, value: product.value, quantity: 1}]);
    };

    const increaseQuantity = (name) => {
      setBasket(basket.map((item) => {
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
    };

    const buttons = basketHasItem(product.name) ? 
    (
      <Box sx={{display: 'flex', margin: '0 auto'}}>
        <Button onClick={() => decreaseQuantity(product.name)}>-</Button>
        <Typography sx={{lineHeight: '40px', height: '40px'}}>{basketItemQuantity(product.name)}</Typography>
        <Button onClick={() => increaseQuantity(product.name)}>+</Button>
      </Box>
    ) : (
      <Button onClick={() => addItem(product)}>Add</Button>
    );

    const featuredText = product.featured ? 
    (
      <Typography variant="h7" sx={{marginTop: '10px', display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}><StarIcon />Best Seller</Typography>
    ) : (<Typography variant="h7" sx={{marginTop: '30px'}}></Typography>);

    return (
      <BodyElement key={product.name} xs={12} md={product.featured ? 6 : 4} lg={2} styleOverrides={{paddingLeft: '10px', paddingRight: '10px'}}>
        <img src={ "../shop/products/" + product.image } style={{objectFit: 'cover', width: '100%', height: '100%'}} />
        {featuredText}
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="p" sx={{ color: theme.palette.text.secondary }}>{product.description}</Typography>
        <Typography variant="p">£{product.value}</Typography>
        {buttons}
      </BodyElement>
    );
  }

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
            <img src="../shop/banner.jpeg" style={{opacity: '0.5', width: '100%', height: '500px', objectFit: 'cover' }} />
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
          <Grid item xs={12} md={6} lg={4} sx={{position: 'relative' }}>
            <img src="../shop/beans-table.jpeg" style={{opacity: '0.7', width: '100%', height: '100%', objectFit: 'cover'}}/>
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center' }}>
              <Typography variant="h1" sx={{ color: theme.palette.primary.contrastText }}>our <b>b</b>eans</Typography>
              <Typography variant="p" sx={{ color: theme.palette.primary.contrastText }}>Premium coffee beans, roasted and infused by us</Typography>
            </Box>
          </Grid>
          {products2.coffee.map((p) => product(p))}
          
          {/* art */}
          <Grid item xs={12} md={6} lg={4} sx={{position: 'relative' }}>
            <img src="../shop/brush.jpeg" style={{opacity: '0.7', width: '100%', height: '100%', objectFit: 'cover'}}/>
            <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center' }}>
              <Typography variant="h1" sx={{ color: theme.palette.primary.contrastText }}>our <b>b</b>rush</Typography>
              <Typography variant="p" sx={{ color: theme.palette.primary.contrastText }}>Unique artwork, curated and created by us</Typography>
            </Box>
          </Grid>
          {products2.art.map((p) => product(p))}
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