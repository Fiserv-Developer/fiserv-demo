import { Box, Divider, Modal, Paper, useTheme } from "@mui/material";

export function ResponsiveModal(props) {
  const theme = useTheme();

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
          {props.title}
          <Divider />
          <br />

          {props.content}
          <Divider sx={{ margin: 4}}/>

          <Box sx={{ width: '100%', textAlign: 'right' }}>
            {props.buttons}
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}