import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import Settings from '../Pages/Settings';
import Invoices from '../Pages/Invoices';
import CheckoutSuccess from '../Components/Shop/CheckoutSuccess';
import CheckoutFailure from '../Components/Shop/CheckoutFailure';
import Shop from '../Pages/Shop';

const routes = (props) => {
  const home = {
    type: "component", 
    name: "Home", 
    url: "/", 
    icon: <HomeIcon/>,
    component: <Home/>, 
  };

  const dashboard = {
    type: "component", 
    name: "Dashboard",
    url: "/dashboard", 
    icon: <DashboardIcon/>,
    component: <Dashboard/>, 
  };

  const shop = {
    type: "component", 
    name: "Shop", 
    url: "/shop", 
    icon: <ShoppingBasket/>,
    component: props ? <Shop setSnackbarOpen={props.setSnackbarOpen} setSnackbarText={props.setSnackbarText}/> : <Shop />, 
  };

  const invoices = {
    type: "component", 
    name: "Invoices", 
    url: "/invoices",
    icon: <ReceiptIcon/>,
    component: <Invoices/>
  };

  const settings = {
    type: "component", 
    name: "Settings", 
    url: "/settings", 
    icon: <SettingsIcon/>,
    component: props ? <Settings setSnackbarOpen={props.setSnackbarOpen} setSnackbarText={props.setSnackbarText}/> : <Settings />, 
  };

  const checkoutSuccess = {type: "hidden", "name": "CheckoutSuccess", "url": "/checkout-success", "component": <CheckoutSuccess/>};
  const checkoutFailure = {type: "hidden", "name": "CheckoutFailure", "url": "/checkout-failure", "component": <CheckoutFailure/>};

  return [home, dashboard, shop, invoices, settings, checkoutSuccess, checkoutFailure];
}

export default routes;