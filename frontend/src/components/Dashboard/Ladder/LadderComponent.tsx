import Contestant from './LadderContestant'

export default function Global(props:any){
	return (
		<div className="w-[40%] overflow-auto m-8 p-6 border-solid border-4 ">
			<h1 className='text-4xl text-center font-bold mb-12 border-solid border-4 p-6'>{props.LadderTitle}</h1>
				<Contestant Name="Aymane"/>
				<Contestant Name="Ouail"/>
				<Contestant Name="Soufiane"/>
				<Contestant Name="7ach7ouch"/>
				<Contestant Name="Taha"/>
				<Contestant Name="Jilali"/>
			</div>
	);
}