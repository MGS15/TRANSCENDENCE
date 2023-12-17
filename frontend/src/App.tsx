import Navbar from "./components/Navbar";
import SideBar from './components/sidebar/SideBar';
import NotificationBar from './components/notifbar/NotificationBar';
import Login_page from './components/login_page/login_page';

const App = () => {
	return (
	<div>
		<Navbar />
		<SideBar />
		<NotificationBar />
    	<Login_page />
	</div>
)}

export default App;
