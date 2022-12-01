import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Grid, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from '../Title';

export default function SendInvoice(props) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState();

  useEffect(() => {
    if (email !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email]);

  const modalTitle = (
    <Title icon={<CheckBoxIcon />} primary="Send Invoice" secondary="Enter an email address to send to" />
  );

  const modalContent = (
    <Grid container item spacing={3}>
      <Grid item xs={12}>
        <TextField
          required fullWidth
          id="email"
          name="email"
          label="Email Address"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
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
            backgroundColor: theme.palette.primary.light, 
          }
        }}
        onClick={() => props.handleClose()}
      >
        <EmailIcon /> Send
      </Button>
    </React.Fragment>
  )

  return (
    <ResponsiveModal 
      title={modalTitle} 
      content={modalContent} 
      buttons={modalButtons} 
      open={props.open} 
      setOpen={props.setOpen} 
      animationState={props.animationState} />
  )
}