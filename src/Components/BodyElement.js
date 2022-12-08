import { Grid, Paper, useTheme } from "@mui/material";

// A grid item component used by all body / content pages in this project
export default function BodyElement(props) {
  const theme = useTheme();

  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} sx={{...props.styleOverrides}}>
      <Paper
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiLink-root': {
            color: theme.palette.primary.main
          },
          '& .MuiLink-root:hover': {
            color: theme.palette.primary.light
          },
        }}>
        {props.children}
      </Paper>
    </Grid>
  );
}