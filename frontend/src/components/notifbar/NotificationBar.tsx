import { useState } from "react"
import { useContext } from "react"
import { ToggleButton } from "./ToggleButton"
import { HoverDiv } from "../Common"
import { CurrentUser, currentUser } from "../Context/AuthContext"
import profileplaceholder from "../../assets/profileplaceholder.png"
import NotificationItem from "./NotificationItem"
import { INotificaion, InviteType } from "../../types/NotificationItem"



const NotificationBar = () => {
	const [isOpen, seIsOpen] = useState(false)
	const [ state, setState ] = useState(1)

	const notif: INotificaion = {
		initiator : {
			id: 1,
            nickname: "John",
			user42: "MGS",
            avatar: profileplaceholder
		},
		inviteDate: new Date(),
		inviteType: InviteType.GAME,
		status: 1
	}

	const toggleChatBar = () => seIsOpen(!isOpen)

	const user: CurrentUser | null = useContext(currentUser)

	return (
		<>
		{isOpen && (<HoverDiv toggleChatBar={toggleChatBar} />)}


		<ToggleButton isOpen={isOpen} setIsOpen={toggleChatBar} />

		<section
			className={`fixed inset-y-0 right-0 bg-background border-l-2 border-solid 
			sm:w-[85%] md:w-1/2 lg:w-1/2 xl:w-[35%] 2xl:w-[30%] w-[90%] transition-all duration-300
			font-pixelify
			${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}
		>
			<div className={`flex flex-col gap-2 h-full max-h-full min-h-full p-1 divide-x`}>

				<div className={`grid grid-cols-10 gap-1 p-1 h-[92px] min-h-[92px] content-evenly
					cursor-pointer`}>
					<div className={`col-span-2`} >
						<img className={`border-2 border-solid border-textColor w-[72px] min-w-[72px] min-h-[72px] h-[72px]`} src={`${!user ? profileplaceholder : user.avatar}`} alt="" />
					</div>
					<div className={`col-span-4 gap-2 p-2`}>
						<h2 className={`text-primary font-pixelify font-bold text-lg`}>
							{user ? user.nickname : "Loading..."}
						</h2>
						<p className={`${state === 1 ? "text-sucessColor" : state === 2 ? "text-errorColor" : "text-primary"}
							text-xs
						`}>
							<span>•</span>
							{state === 1 ? " Online" : state === 2 ? "Offline" : "In-game"}
						</p>
					</div>

					<div className="col-span-2 flex items-center justify-center h-full">
						<button>level</button>
					</div>
					<div className="col-span-2 flex items-center justify-center h-full">
						<button>view profile</button>
					</div>
				</div>
				<hr className="my-1 h-0.5 border-t-0 bg-textColor opacity-100" />

				<div className={`flex flex-col flex-1 py-3 min-h-[100px] gap-2 px-2 sm:px-3 overflow-y-scroll`}>

					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					<NotificationItem notif={notif} />
					
				</div>

			</div>
		</section>
		</>
	)
}

export default NotificationBar