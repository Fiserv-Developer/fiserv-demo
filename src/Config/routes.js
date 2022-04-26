import ExamplePage from '../Pages/ExamplePage/ExamplePage';
import Portal from '../Pages/Portal/Portal';
import Home from '../Pages/Home/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FileDownload from '@mui/icons-material/FileDownload';
import Link from '@mui/icons-material/Link';
import Documents from '../Pages/Documents/Documents';

let routes = [
    {type:"component", "name":"Home", "url":"/", "component":<Home/>, icon:<InboxIcon/>},
    {type:"component", "name":"Example page", "url":"/page", "component":<ExamplePage/>, icon:<InboxIcon/>},
    {type:"component", "name":"Portal", "url":"/portal", "component":<Portal/>, icon:<InboxIcon/>},
    {type:"component", "name":"Documents", "url":"/documents", "component":<Documents/>, icon:<FileDownload/>},
    {type:"link", "name":"Developer Portal", "url":"https://fiserv.dev/", "component":null, icon:<Link/>},
];

export default routes;