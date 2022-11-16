import Dashboard from '../Pages/Dashboard';
import Home from '../Pages/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import Shop from '../Pages/Shop';
import Settings from '../Pages/Settings';
import ShopSuccess from '../Pages/ShopSuccess';
// import Terminals from '../Pages/Terminals';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

let routes = [
    {type: "component", "name": "Home", "url": "/", "component": <Home/>, icon: <HomeIcon/>},
    {type: "component", "name": "Dashboard", "url": "/dashboard", "component": <Dashboard/>, icon: <DashboardIcon/>},
    {type: "component", "name": "Shop", "url": "/shop", "component": <Shop/>, icon: <ShoppingBasket/>},
    // {type: "component", "name": "Terminals", "url": "/terminals", "component": <Terminals/>, icon: <PointOfSaleIcon/>},
    {type: "component", "name": "Settings", "url": "/settings", "component": <Settings/>, icon: <SettingsIcon/>},
    // other 'hidden' routes
    {"name": "ShopSuccess", "url": "/shop-success", "component": <ShopSuccess/>},
    // {"name": "ShopFailure", "url": "/shop-failure", "component": <ShopFailure/>},
];

export default routes;