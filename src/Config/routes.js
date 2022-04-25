import ExamplePage from '../Pages/ExamplePage/ExamplePage';
import Portal from '../Pages/Portal/Portal';
import Home from '../Pages/Home/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';

let routes = [
    {"name":"Home", "url":"/", "component":<Home/>, icon:<InboxIcon/>},
    {"name":"Example page", "url":"/page", "component":<ExamplePage/>, icon:<InboxIcon/>},
    {"name":"Portal", "url":"/portal", "component":<Portal/>, icon:<InboxIcon/>}
];

export default routes;