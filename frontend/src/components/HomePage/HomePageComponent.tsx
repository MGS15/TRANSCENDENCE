import GameBoy from "../../assets/GameBoy.png";

export default function HomePageDiv() {
	return (
		<div className="bg-BkColor flex mx-5 2xl:m-auto justify-between items-center border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] p-3 max-w-[1536px]">
			<div className="flex flex-col place-items-center min-[1199px]:items-start w-[100%] min-[1199px]:w-[60%] p-5 2xl:p-0 gap-y-11 lg:m-9">
				<p className="ml-[-50px] min-[400px]:ml-0 truncate animate-[pulse_2.6s_ease-in-out_infinite] TrTitle text-clip text-primary text-center xl:text-left px-6 min-[1199px]:m-0 min-[1199px]:px-0 text-xs sm:text-2xl md:text-3xl lg:text-5xl font-pixelify w-full">
					TRANSCENDENCE PINGPONG GAME
				</p>
				<p className="text-center text-xl px-12 min-[1199px]:text-2xl min-[1199px]:px-0 font-Nova capitalize">
					Step back into the 90s with our website, a nostalgic trip to the world of ping-pong gaming. Relive
					the classic games, iconic moments, and the unique charm of that era. Whether you're a seasoned
					player or a curious newcomer, we're here to celebrate the enduring magic of 90s ping-pong.
				</p>
				<button className="min-[1199px]:ml-6 text-xs min-[545px]:text-2xl bg-buttonColor rounded-full font-pixelify border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] p-2 sm:p-4 w-[100%] min-[200px]:w-[60%] min-[550px]:text-base min-[550px]:w-[40%] sm:w-[50%] md:w-[35%] min-[1199px]:w-1/2">
					JOIN US NOW
				</button>
			</div>
			<div className="min-[0px]:hidden min-[1199px]:flex m-4 flex place-content-center w-[40%]">
				<img src={GameBoy} className="GameBoy" alt="pic" />
			</div>
		</div>
	);
}
