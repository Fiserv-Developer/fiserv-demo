import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

export default function KeyFormControl(props) {
  return (
    <FormControl variant="outlined" sx={{ marginBottom: "20px", }}>
      <InputLabel htmlFor="outlined-adornment-password">
        {props.label}
      </InputLabel>
      <OutlinedInput
        label={props.label}
        type={props.display ? 'text' : 'password'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => props.onClick()}
              onMouseDown={props.handleMouseDownPassword}
              edge="end"
            >
                {props.display ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}