import ExamplePage from '../Pages/ExamplePage/ExamplePage';
import Home from '../Pages/Home/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';

let routes = [
    {"name":"Home", "url":"/", "component":<Home/>, icon:<InboxIcon/>},
    {"name":"Example page", "url":"/page", "component":<ExamplePage/>, icon:<InboxIcon/>}
]


export default routes;