import Global from './LadderComponent'

export default function LeaderBoard(){
	return (
		<div className='max-w-[1536px] min-[0px]:mx-5 2xl:m-auto flex justify-evenly align-center font-pixelify border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] w-full'>
			<Global LadderTitle="GLOBAL LEADERBOARD"/>
			<Global LadderTitle="FRIENDS LEADERBOARD"/>
		</div>
	);
} 