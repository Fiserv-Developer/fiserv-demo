import { Box, CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/private-theming";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import { light } from "./Config/themes";

function App() {
  const theme = createTheme(light);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Menu />
          <Body />
        </Box>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
