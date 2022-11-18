import { Grid, Paper, useTheme } from "@mui/material";

// A grid item component used by all body / content pages in this project
export default function BodyElement(props) {
  const theme = useTheme();

  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg}>
      <Paper
        sx={{
          p: 2,
          color: theme.palette.text.main,
          backgroundColor: theme.palette.secondary.main,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        {props.children}
      </Paper>
    </Grid>
  );
}