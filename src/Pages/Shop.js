import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CheckoutFailure from '../Components/Shop/CheckoutFailure';
import CheckoutSuccess from '../Components/Shop/CheckoutSuccess';
import Products from '../Components/Shop/Products';
import { config } from '../Config/constants';
import { fetchWithRetry, getValueOrDefault, withSignature } from '../Config/utils';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';

export default function Shop() {
  const baseUrl = config.nonProdBaseUrl;
  const apiKey = getValueOrDefault(config.nonProdApiKey, "");
  const secretKey = getValueOrDefault(config.nonProdSecretKey, "");
  const [basket, setBasket] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
             "successUrl": "https://demo.fiserv.dev/shop?success=true", // todo improve callback flow
             "failureUrl": "https://demo.fiserv.dev/shop?failure=true"
        }
      },
    };
  
    withSignature(apiKey, secretKey,
      "POST",
      data,
      (options) => fetchWithRetry(url, options)
        .then(data => window.location.href = data.checkout.redirectionUrl)
        .catch(rejected => {
          window.location.href = "/shop?failure=true"; // todo improve callback flow
        }));
  }

  if (searchParams.get('success')) {
    return <CheckoutSuccess />;
  } else if (searchParams.get('failure')) {
    return <CheckoutFailure />;
  } else {
    return (<Products basket={basket} setBasket={setBasket} checkout={checkout}/>);
  }
}