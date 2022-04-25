import ExamplePage from '../Pages/ExamplePage/App';
import Home from '../Pages/Home/App';
import InboxIcon from '@mui/icons-material/MoveToInbox';

let routes = [
    {"name":"Home", "link":"/", "component":<Home/>, icon:<InboxIcon/>},
    {"name":"Example page", "link":"/page", "component":<ExamplePage/>, icon:<InboxIcon/>}
]


export default routes;