import Contestant from './LadderContestant'
import users from './Users'

export default function Global({contestant, LadderTitle} : {contestant : any, LadderTitle: any}){
	return (
		<div className="max-w-[1536px] m-8 p-10 border-solid border-4 h-[60rem] Ft bg-[#F6F4F0] shadow-[2px_4px_0px_0px_#000301]">
			<h1 className='min-[0px]:text-lg xl:text-2xl text-3xl text-center font-Nova font-black mb-1 border-solid border-4 p-6 bg-white shadow-[2px_4px_0px_0px_#000301]'>{LadderTitle}</h1>
				<div className="rr overflow-y-auto h-[48rem] FF cursor-row-resize">
					{users.map((user, index) => (
						<Contestant Name={users[index].name}/>
					))}
				</div>
		</div>
	);
}