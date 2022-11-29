import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BodyElement from "../BodyElement";

export default function CheckoutSuccess() {
  return (
    <Box style={{ textAlign: 'center', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
      <Box style={{display: 'block' }}>
        <BodyElement xs={12} sx={{padding: '2em'}}>
          <ThumbUpIcon style={{ fontSize: '4em', margin: '0 auto', marginBottom: '0.5em',}}/>
          <Typography gutterBottom component="p" variant="h6" 
            style={{
              margin: '0 auto',
              marginBottom: '1em',
            }}>
            Your transaction was successful!
          </Typography>
          <Link to="/shop" style={ {margin: '0 auto', marginBottom: '1em', }}>
            <Button>Continue Shopping</Button>
          </Link>
      </BodyElement>
      </Box>
    </Box>
  );
}