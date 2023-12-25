import Navbar from "../Navbar";
import Footer from "../Footer";
import ProfileDiv from "./UserProfile/UserProfile";
import Carousel from "./PongAchievements/Carousel";
import Stats from "./PongStats/Stats";
import Ladder from './Ladder/LeaderBoard'
import contestants from './Ladder/LeaderBoard'
import History from './matchHistory/matchHistory'

export default function  Dashboard(){
	return (

		<div className="flex flex-col gap-y-16 mt-16" >
			<ProfileDiv Username="User" nickname="Nickname" State="Online"/>
			<Carousel/>
			<Stats/>
			<Ladder contestants={contestants}/>
			<History />
			<Footer/>
		</div>
	);
} 