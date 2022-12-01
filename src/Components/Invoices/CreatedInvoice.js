import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Button, Divider, Modal, Paper, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Title } from '../Title';

export default function CreatedInvoice(props) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

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
          className={props.createdInvoiceAnimationState} 
          onAnimationEnd={() => {
            if (props.createdInvoiceAnimationState === "contract") {
              props.setCreatedInvoiceOpen(false);
            }
          }}
        >
          <Title icon={<CheckBoxIcon />} primary="Invoice Created" secondary="Please copy your new payment link" />
          <Divider />
          <br />
          <Typography sx={{
            textAlign: 'center', 
            border: '1px solid ' + theme.palette.background.line, 
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
            padding: '2px'
            }}
          >
            {props.newLink} <Button onClick={() => {
              navigator.clipboard.writeText(props.newLink);
              setCopied(true);
            }}><ContentCopyIcon/> {copied ? "Copied!" : ""}</Button>
          </Typography>
          <br />
        
          <Divider sx={{ borderColor: theme.palette.background.default, margin: 4}}/>
          <Button
            sx={{
              color: theme.palette.primary.contrastText, 
              backgroundColor: theme.palette.primary.main, 
              right: '10px', bottom: '10px', position: 'fixed',
              '&:hover': {
                backgroundColor: theme.palette.primary.light, 
              }
            }}
            onClick={() => props.handleCreatedInvoiceClose()}
          >
            <DoneIcon /> OK
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
}