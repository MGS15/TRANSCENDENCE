import Navbar from "../Navbar";
import HomePageDiv from './HomePageComponent';
import Features from './Features';
import Team from './TeamComponent';
import Footer from '../Footer'

export default function HomePage(props: any){
	return (
	<div>
		<Navbar isLogged={true} />
		<HomePageDiv/>
		<Features/>
		<Team/>
		<Footer/>
	</div>
)}
