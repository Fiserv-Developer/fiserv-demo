import { Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BodyElement from "../Components/BodyElement";

export default function ShopSuccess() {
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
          Your transaction was successful!
        </Typography>
        <Link to="/shop" style={{margin: '0 auto'}}>
          <Button style={{color: theme.palette.text.main}}>Continue Shopping</Button>
        </Link>
      </BodyElement>
    </React.Fragment>
  );
}