import { Box, Divider, Modal, Paper, useTheme } from "@mui/material";
import React from "react";

export function ResponsiveModal(props) {
  const theme = useTheme();

  const titleSection = props.title ? (
    <React.Fragment>
    {props.title}
    <Divider />
    <br />
    </React.Fragment>
  ) : (null);

  const buttonsSection = props.buttons ? (
    <React.Fragment>
      <Divider sx={{ margin: 4}}/>
      <Box sx={{ width: '100%', textAlign: 'right' }}>
        {props.buttons}
      </Box>
    </React.Fragment>
  ) : (null);

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box 
        sx={{
          [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            p: 1,
          },
          [theme.breakpoints.down('md')]: { 
            width: '100%', 
            height: '100vh', 
          },
        }}
      >
        <Paper
          className={props.animationState}
          onAnimationEnd={() => {
            if (props.animationState === "contract") {
              props.setOpen(false);
            }
          }}
          sx={{ 
            p: 4, 
            [theme.breakpoints.down('sm')]: { 
              overflow: 'auto', 
              borderRadius: 0, 
              height: '100vh', 
            } 
          }}
        >
          {titleSection}
          {props.content}
          {buttonsSection}
        </Paper>
      </Box>
    </Modal>
  );
}