import "./App.css";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from './Config/routes';
import { ThemeProvider } from "@mui/private-theming";
import theme from "./Config/theme";
import ExamplePage from "./Pages/ExamplePage/ExamplePage";

function App() {
  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Body>
        <Routes>
          {routes.map((value, index) => {
            console.log("Adding route for", value, index);
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
