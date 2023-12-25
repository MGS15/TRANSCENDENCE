import Profil from '../../../assets/profile.png'
import Rank from '../../../assets/Rank.png'

export default function Contestant(props:any){
	return (
		<div className="flex p-auto border-2 border-solid border-black box-border min-[0px]:gap-x-6 md:gap-x-14 p-2 align-center w-[90%] m-auto my-6 shadow-[2px_4px_0px_0px_#000301] bg-white">
			<img src={Rank} className='PositionLogo my-2 mr-0 w-[5%] h-[5%] ml-6'></img>
			<img src={Profil} className='Profil min-[0px]:w-[8%] min-[0px]:h-[5%] min-[0px]:hidden sm:block border-2 border-solid border-black ml-1 shadow-[2px_4px_0px_0px_#000301]'></img>
			<h1 className="font-Nova min-[0px]:text-sm sm:text-xl md:text-2xl md:ml-5 truncate">{props.Name}</h1>
		</div>
	);
}