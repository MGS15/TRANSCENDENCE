import Navbar from "../Navbar";
import ProfileDiv from "./UserProfile";
import Carousel from "./Carousel/Carousel";

export default function  Dashboard(){
	return (
		<div className='flex flex-col gap-y-16 mt-0'>
			<Navbar isLogged={true}/>
			<ProfileDiv Username="AYMANE" nickname="BASILISK" State="Online"/>
			<Carousel/>
		</div>
	);
} 