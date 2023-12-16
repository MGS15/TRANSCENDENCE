import Contestant from './LadderContestant'
import users from './Users'

export default function Global({contestant, LadderTitle} : {contestant : any, LadderTitle: any}){
	return (
		<div className="max-w-[1536px] m-8 p-10 border-solid border-4 h-[64rem] ">
			<h1 className='min-[0px]:text-xl sm:text-2xl md:text-3xl 2xl:text-4xl text-center font-bold mb-12 border-solid border-4 p-6'>{LadderTitle}</h1>
				<div className="border-solid border-black border-4 overflow-y-auto h-[48rem]">
				{users.map((user, index) => (
					<Contestant Name={users[index].name}/>
					))}
				</div>
		</div>
	);
} 