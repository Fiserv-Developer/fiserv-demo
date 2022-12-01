import { Box } from "@mui/material";

export function CenteredBox(props) {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: '120px'}}>
      <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', textAlign: 'center'}}>
        {props.children}
      </Box>
    </Box>
  );
}