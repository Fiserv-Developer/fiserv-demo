import "./App.css";
import Body from "./Components/Body/App";
import Footer from "./Components/Footer/App";
import Header from "./Components/Header/App";
import Home from "./Pages/Home/App";
import ExamplePage from "./Pages/ExamplePage/App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import routes from './Config/routes';
import { ThemeProvider } from "@mui/private-theming";
import theme from "./Config/theme";

function App() {
  return (

  <ThemeProvider theme={theme}>
    <div className="App">
      <Header />
      <Body>
      <BrowserRouter>
      <Routes>
        {routes.map((value, index) => {
          return (<Route path={value.link} element={value.component} />)
        })}
      </Routes>
    </BrowserRouter>
      </Body>
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
