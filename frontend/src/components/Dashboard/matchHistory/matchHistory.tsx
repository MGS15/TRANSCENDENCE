import HistoryMatch from '../matchHistory/HistoryComponent'

export default function History(props:any) {
	return (
		<div className="min-[0px]:mx-5 2xl:m-auto max-w-[1536px] flex min-[0px]:flex-col justify-content-evenly border-solid border-4 border-black 2xl:w-full shadow-[2px_4px_0px_0px_#000301] p-10 gap-y-8">
			<h1 className="min-[0px]:text-lg xl:text-2xl text-3xl text-center font-Nova font-black mb-1 border-solid border-4 p-6 bg-white shadow-[2px_4px_0px_0px_#000301]">
				PONG HISTORY
			</h1>
			<div className="Ft flex min-[0px]:flex-col border-solid border-4 border-black p-8 bg-[#F6F4F0] shadow-[2px_4px_0px_0px_#000301]">
				<div className="flex flex-col gap-x-8 overflow-y-auto max-h-[60rem] rr ff gap-y-14 cursor-row-resize">
					<HistoryMatch player1="aymane" player2="Mgs" one={3} two={3}/>
					<HistoryMatch player1="Ouail" player2="Taha" one={1} two={3}/>
					<HistoryMatch player1="7ach7ouch" player2="Jilali" one={6} two={7}/>
					<HistoryMatch player1="Boqal" player2="Hmida" one={4} two={0}/>
					<HistoryMatch player1="jhon" player2="michael" one={5} two={12}/>
					<HistoryMatch player1="stephanie" player2="alice" one={2} two={5}/>
					<HistoryMatch player1="jack" player2="marshall" one={7} two={3}/>
				</div>
			</div>
		</div>
	);
}
