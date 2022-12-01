import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, Divider, Grid, Modal, Paper, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
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

  return (
    <Modal
      open={props.open}
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
          sx={{ p: 4 }} 
          className={props.sendInvoiceAnimationState} 
          onAnimationEnd={() => {
            if (props.sendInvoiceAnimationState === "contract") {
              props.setSendInvoiceOpen(false);
            }
          }}
        >
          <Title icon={<CheckBoxIcon />} primary="Send Invoice" secondary="Enter an email address to send to" />
          <Divider />
          <br />
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
        
          <Divider sx={{ borderColor: theme.palette.background.default, margin: 4}}/>
          <Button 
            sx={{color: theme.palette.primary.main, left: '10px', bottom: '10px', position: 'fixed'}}
            onClick={props.handleSendInvoiceClose}>
            <ArrowBackIcon /> Cancel
          </Button>
          <Button
            disabled={!valid}
            sx={{
              color: theme.palette.primary.contrastText, 
              backgroundColor: theme.palette.primary.main, 
              right: '10px', bottom: '10px', position: 'fixed',
              '&:hover': {
                backgroundColor: theme.palette.primary.light, 
              }
            }}
            onClick={() => props.handleSendInvoiceClose()}
          >
            <EmailIcon /> Send
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}