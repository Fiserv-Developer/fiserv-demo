import { Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from "@mui/material";

export function Title(props) {
  const theme = useTheme();

  return (
    <List>
      <ListItem disablePadding>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>{props.icon}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.primary} secondary={props.secondary} primaryTypographyProps={{ fontSize: "2em" }} />
      </ListItem>
    </List>
  );
}