import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchWithRetry, withSignature } from '../../Config/utils';
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from '../Title';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function NewInvoice(props) {
  const theme = useTheme();
  const [valid, setValid] = useState();

  // form fields
  const [storeId, setStoreId] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [expires, setExpires] = useState("");

  const create = () => {
    props.handleProcessingOpen();

    // DUMMY
    // handleLinkCreated("https://www.checkout-lane.com/pl/dBpYUi");

    // REAL
    const random = "" + Math.floor(100000000 + Math.random() * 900000000);
    const url = props.baseUrl + "/payment-links";
    const data = {
      "storeId": "72305408",
      "merchantTransactionId": "AB-1234",
      "transactionOrigin": "ECOM",
      "transactionType": transactionType,
      "transactionAmount": {
        "total": parseFloat(amount),
        "currency": currency,
        // "components": {
        //   "subtotal": 98,
        //   "vatAmount": 22,
        //   "shipping": 10
        // }
      },
      "order": {
        "orderId": random,
        "shipping": {
          "person": {
            "firstName": "John",
            "lastName": "Doe",
            "dateOfBirth": "1975-01-31"
          },
          "contact": {
            "phone": "4567278956",
            "mobilePhone": "7834561235",
            "email": "john@testemail.com",
            "fax": "5555555767"
          },
          "address": {
            "address1": "House No: 2, street -5",
            "address2": "Weberstr",
            "city": "BONN",
            "company": "Test company",
            "country": "Germany",
            "postalCode": "53113",
            "region": "Nordrhein-Westfalen"
          }
        },
        "billing": {
          "person": {
            "firstName": "John",
            "lastName": "Doe",
            "dateOfBirth": "1975-01-31"
          },
          "contact": {
            "phone": "4567278956",
            "mobilePhone": "7834561235",
            "email": "john@testemail.com",
            "fax": "5555555767"
          },
          "address": {
            "address1": "House No: 2, street -5",
            "address2": "Weberstr",
            "city": "BONN",
            "company": "Test company",
            "country": "Germany",
            "postalCode": "53113",
            "region": "Nordrhein-Westfalen"
          }
        },
        "orderDetails": {
          "customerId": "1234567890",
          "dynamicMerchantName": "Merchant XYZ",
          "invoiceNumber": "96126098",
          "purchaseOrderNumber": "123055342"
        },
        "basket": {
          "lineItems": [
            {
              "itemIdentifier": "Item001",
              "name": "Mobile",
              "price": 98,
              "quantity": 1,
              "shippingCost": 10,
              "valueAddedTax": 22,
              "miscellaneousFee": 0,
              "total": 130
            }
          ]
        }
      },
      "checkoutSettings": {
        "locale": "de_DE",
        "preSelectedPaymentMethod": "cards",
        "webHooksUrl": "https://yourapp.com/data",
        "redirectBackUrls": {
          "successUrl": "https://www.successexample.com",
          "failureUrl": "https://www.failureexample.com"
        }
      },
      "paymentMethodDetails": {
        "cards": {
          "authenticationPreferences": {
            "challengeIndicator": "01",
            "scaExemptionType": "LOW_VALUE_EXEMPTION",
            "skipTra": false
          },
          "createToken": {
            "customTokenValue": "234ljl124l12",
            "declineDuplicateToken": false,
            "reusable": true,
            "toBeUsedFor": "UNSCHEDULED"
          },
          "tokenBasedTransaction": {
            "value": "234ljl124l12",
            "transactionSequence": "FIRST",
            "schemeTransactionId": "012243800355698"
          }
        },
        "sepaDirectDebit": {
          "mandateReference": "3RBQVEE",
          "signatureDate": "2021-06-15",
          "transactionSequenceType": "SINGLE",
          "mandateReferenceUrl": "https://www.example.com"
        }
      },
      "paymentLinkDetails": {
        "expiryDateTime": expires
      }
    };
  
    withSignature(props.apiKey, props.secretKey,
      "POST",
      data,
      (options) => fetchWithRetry(url, options)
        .then(data => handleLinkCreated(data.paymentLink.paymentLinkUrl))
        .catch(rejected => {
          window.location.href = "/checkout-failure"; // todo improve callback flow
        }));
  }

  const handleLinkCreated = (newLink) => {
    // props.setNewLink("https://www.checkout-lane.com/pl/dBpYUi");
    props.setNewLink(newLink)
    props.handleProcessingClose();
    props.handleCreatedInvoiceOpen();
    setStoreId("");
    setTransactionType("");
    setCurrency("");
    setAmount("");
  }

  useEffect(() => {
    if (storeId !== '' && transactionType !== '' && currency !== '' && amount !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [storeId, transactionType, currency, amount]);

  const modalTitle = (
    <Title icon={<AddBoxIcon />} primary="Create Invoice" secondary="Enter the required fields below" />
  );

  const modalContent = (
    <Grid container item spacing={3}>
      <Grid item xs={12}>
        <InputLabel id="storeId-label">Store ID</InputLabel>
        <Select
          required fullWidth
          id="storeId"
          name="storeId"
          labelId="storeId-label"
          variant="standard"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
        >
          <MenuItem value="72305408">72305408</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel id="transactionType-label">Transaction Type</InputLabel>
        <Select
          required fullWidth
          id="type"
          name="type"
          labelId="transactionType-label"
          variant="standard"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <MenuItem value="SALE">SALE</MenuItem>
          <MenuItem value="PRE AUTH">PRE-AUTH</MenuItem>
          <MenuItem value="ZERO AUTH">ZERO-AUTH</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Expiry Date"
          value={expires}
          onChange={(newValue) => {
            setExpires(newValue);
          }}/>
      </Grid>

      <Grid item xs={12} sm={6}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          required fullWidth
          id="currency"
          name="currency"
          labelId="currency-label"
          variant="standard"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Amount</InputLabel>
        <TextField
          required fullWidth
          id="amount"
          name="amount"
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}/>
      </Grid>
    </Grid>
  );

  const modalButtons = (
    <React.Fragment>
      <Button 
        sx={{
          color: theme.palette.primary.main, 
          left: '20px', 
          position: 'absolute' 
        }}
        onClick={props.handleClose}>
        <ArrowBackIcon /> Cancel
      </Button>

      <Button 
        disabled={!valid}
        sx={{
          color: theme.palette.primary.contrastText, 
          backgroundColor: theme.palette.primary.main, 
          '&:hover': {
            backgroundColor: theme.palette.primary.light 
          },
        }}
        onClick={create}
      >
        <AddIcon /> Create
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