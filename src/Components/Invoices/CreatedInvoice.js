import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { ResponsiveModal } from '../ResponsiveModal';
import { Title } from '../Title';

export default function CreatedInvoice(props) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const modalTitle = (
    <Title icon={<CheckBoxIcon />} primary="Invoice Created" secondary="Please copy your new payment link" />
  );

  const modalContent = (
    <Typography 
      sx={{
        textAlign: 'center', 
        border: '1px solid ' + theme.palette.background.line, 
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        padding: '2px'
      }}
    >
      {props.newLink.url} 
      <Button 
        onClick={() => {
          navigator.clipboard.writeText(props.newLink.url);
          setCopied(true);
        }}
      >
        <ContentCopyIcon/> {copied ? "Copied!" : ""}
      </Button>
    </Typography>
  );

  const modalButtons = (
    <Button
      sx={{
        color: theme.palette.primary.contrastText, 
        backgroundColor: theme.palette.primary.main, 
        '&:hover': {
          backgroundColor: theme.palette.primary.light, 
        }
      }}
      onClick={() => { props.handleClose(); setCopied(false) }}
    >
      <DoneIcon /> OK
    </Button>
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