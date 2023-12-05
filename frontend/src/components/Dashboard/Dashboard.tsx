import Navbar from "../Navbar";
import Footer from "../Footer";
import ProfileDiv from "./UserProfile";
import Carousel from "./Carousel/Carousel";
import Stats from "../Dashboard/Stats";
import HomePage from "../HomePage/HomePage";

export default function  Dashboard(){
	return (
		<div className="flex flex-col gap-y-16" >
			<Navbar isLogged={true}/>
			<ProfileDiv Username="AYMANE" nickname="BASILISK" State="Online"/>
			<Carousel/>
			<Stats/>
			<Footer/>
		</div>
	);
} 