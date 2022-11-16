import { Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BodyElement from "../Components/BodyElement";

export default function ShopFailure() {
  const theme = useTheme();
  
  return (
    <React.Fragment>
      <BodyElement xs={12}>
        <Typography gutterBottom component="p" variant="h6" 
          style={{
            color: theme.palette.text.main,
            margin: '0 auto',
            paddingTop: '40vh'
          }}>
          There was a problem processing your purchase!
        </Typography>
        <Link to="/shop" style={{margin: '0 auto'}}>
          <Button style={{color: theme.palette.text.main}}>Return to Shop</Button>
        </Link>
      </BodyElement>
    </React.Fragment>
  );
}