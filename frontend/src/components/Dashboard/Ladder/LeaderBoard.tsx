import Global from "./LadderComponent";

export default function LeaderBoard({ GLadder, FLadder }: { GLadder: any; FLadder: any }) {
	return (
		<div className="min-[0px]:mx-5 2xl:m-auto flex min-[0px]:flex-col 2xl:flex-row md:align-center max-w-[1536px] font-pixelify border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] p-8">
			<Global Ladder={GLadder} LadderTitle="GLOBAL LEADERBOARD" />
			<Global Ladder={FLadder} LadderTitle="FRIENDS LEADERBOARD" />
		</div>
	);
}
