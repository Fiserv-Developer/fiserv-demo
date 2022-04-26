import Portal from '../Pages/Portal/Portal';
import Home from '../Pages/Home/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Cottage from '@mui/icons-material/Cottage';
import HomeIcon from '@mui/icons-material/Home';
import FileDownload from '@mui/icons-material/FileDownload';
import Link from '@mui/icons-material/Link';
import Documents from '../Pages/Documents/Documents';

let routes = [
    {type:"component", "name":"Home", "url":"/", "component":<Home/>, icon:<HomeIcon/>},
    {type:"component", "name":"Portal", "url":"/portal", "component":<Portal/>, icon:<Cottage/>},
    {type:"component", "name":"Documents", "url":"/documents", "component":<Documents/>, icon:<FileDownload/>},
    {type:"link", "name":"Developer Portal", "url":"https://fiserv.dev/", "component":null, icon:<Link/>},
];

export default routes;