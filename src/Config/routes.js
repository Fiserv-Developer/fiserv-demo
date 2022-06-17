import Portal from '../Pages/Portal';
import Home from '../Pages/Home';
import AccountBalance from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import Link from '@mui/icons-material/Link';
import Shop from '../Pages/Shop';

let routes = [
    {type:"component", "name":"Home", "url":"/", "component":<Home/>, icon:<HomeIcon/>},
    {type:"component", "name":"Portal", "url":"/portal", "component":<Portal/>, icon:<AccountBalance/>},
    {type:"component", "name":"Shop", "url":"/shop", "component":<Shop/>, icon:<ShoppingBasket/>},
    {type:"link", "name":"Developer Portal", "url":"https://fiserv.dev/", "component":null, icon:<Link/>},
];

export default routes;