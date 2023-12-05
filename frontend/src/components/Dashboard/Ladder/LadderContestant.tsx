import Profil from '../../../assets/profile.png'
import First from '../../../assets/First.png'

export default function Contestant(props:any){
	return (
		<div className="flex border-2 border-solid border-black box-border w-auto gap-x-6 m-6 p-2 align-center">
			<img src={First} className='PositionLogo w-[50px] h-[50px] ml-2'></img>
			<img src={Profil} className='Profil w-[50px] h-[50px] border-2 border-solid border-black ml-1'></img>
			<h1 className="font-Nova text-3xl ml-5">{props.Name}</h1>
		</div>
	);
}