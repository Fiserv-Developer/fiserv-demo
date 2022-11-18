import { Box, CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/private-theming";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import { light, dark } from "./Config/themes";

function App() {
  const [themeToggle, setThemeToggle] = useState(true); // false is dark, true is light
  const theme = createTheme(themeToggle ? light : dark)

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Menu themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
          <Body />
        </Box>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
