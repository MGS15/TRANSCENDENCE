import Profil from '../../../assets/profile.png'
import First from '../../../assets/First.png'

export default function Contestant(props:any){
	return (
		<div className="flex p-auto border-2 border-solid border-black box-border min-[0px]:gap-x-6 md:gap-x-14 p-2 align-center w-[90%] m-auto my-6">
			<img src={First} className='PositionLogo min-[0px]:w-[8%] min-[0px]:h-[8%] sm::h-[10%] sm::h-[10%]  ml-2'></img>
			<img src={Profil} className='Profil min-[0px]:w-[8%] min-[0px]:h-[8%] min-[0px]:hidden sm:block border-2 border-solid border-black ml-1'></img>
			<h1 className="font-Nova min-[0px]:text-sm sm:text-2xl 2xl:text-3xl md:ml-5 truncate">{props.Name}</h1>
		</div>
	);
}