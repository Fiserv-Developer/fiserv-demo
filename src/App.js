import { Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import { dark, light } from "./Config/themes";

function App() {
  const [themeToggle, setThemeToggle] = useState(true); // false is dark, true is light
  const theme = createTheme(themeToggle ? light : dark);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <Menu themeToggle={themeToggle} setThemeToggle={setThemeToggle} />
          <Body />
        </Box>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
