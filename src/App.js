import "./App.css";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './Config/routes';
import { ThemeProvider } from "@mui/private-theming";
import { light } from "./Config/themes";
import { createTheme } from '@mui/material/styles';
import Menu from "./Components/Menu";
import { Box, CssBaseline } from "@mui/material";

function App() {
  const theme = createTheme(light);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Menu />
          <Box 
            backgroundColor={theme.palette.primary.main} 
            sx={{ display: 'flex', width: '100%', minHeight: '100vh',  paddingLeft: '30px', paddingRight: '30px'}}>
            <Routes>
              {routes.map((route, index) => {
                return (<Route key={index} path={route.url} exact element={route.component} />)
              })}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
