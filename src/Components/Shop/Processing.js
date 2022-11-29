import { Box, Modal, Paper } from "@mui/material";
import Placeholder from "../Placeholder";

export default function Processing(props) {

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
          className={props.processingAnimationState}>
          <Placeholder />
        </Paper>
      </Box>
    </Modal>
  );
}