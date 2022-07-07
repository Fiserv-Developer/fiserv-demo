import "./App.css";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './Config/routes';
import { ThemeProvider } from "@mui/private-theming";
import { dark, light } from "./Config/themes";
import { useState } from "react";
import { createTheme } from '@mui/material/styles';

function App() {
   // Theme Management
   const [theme, setTheme] = useState(true)
   const dynamicTheme = createTheme(theme ? light : dark)
   

  return (
    <ThemeProvider theme={dynamicTheme}>
      <BrowserRouter>
        <Header theme={theme} setTheme={setTheme}/>
        <Body backgroundColor={dynamicTheme.palette.primary.main}>
          <Routes>
            {routes.map((value, index) => {
              return (<Route key={index} path={value.url} element={value.component} />)
            })}
          </Routes>
        </Body>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
