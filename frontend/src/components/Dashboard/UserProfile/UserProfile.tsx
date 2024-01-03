import AddPerson from "../../../assets/AddPerson.png";
import BlockPerson from "../../../assets/BlockPerson.png";
import Profil from "../../../assets/profile.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ip } from "../../../network/ipaddr";
import IUser from "../../../types/User";
const useGetFrienshipsStatus = async (setisFriend: any, dashstate: IUser )=>{
	try {
		useEffect(() => {
			fetch(`http://${ip}3001/profile/friendship/${dashstate?.id}`, {
				method: "GET",
				credentials: "include",
			})
				.then((Response) => Response.json())
				.then((Response) => {
					if (Response.statusCode >= 400) {
						toast(`HTTP error! Status: ${Response.status}`);
						setisFriend(false);
					}
					else
					setisFriend(true);
					console.log("in success", Response);
				});
		}, [dashstate]);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}
export default function ProfileDiv({ who, usr, func }: { who: Boolean; usr: IUser; func: any }) {
	const [postContent, setPostContent] = useState("");
	const [isFriend, setisFriend] = useState<boolean>(false);
	const updateStatus = async () => {
		const response = await fetch(`http://${ip}3001/profile/updateStatus`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: postContent,
			}),
		});

		const data = await response.json();
		console.log("data is: ", data);
		if (!response.ok) {
			toast.error(data.message);
		} else {
			func(data);
			toast("Updated Succefully!");
		}
	};
	useGetFrienshipsStatus(setisFriend,usr)

	return (
		<div className="ProfileDiv Ft min-[0px]:mx-5 2xl:m-auto flex min-[0px]:flex-col-reverse lg:flex-row border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] p-10 2xl:w-full max-w-[1536px]">
			<div className="LeftDiv flex flex-col lg:w-[75%]">
				<h1 className="ModUserName min-[0px]:text-xl md:text-3xl font-bold font-Nova uppercase">
					{usr.user42}
				</h1>
				<div className="SocialHolder flex min-[0px]:flex-col sm:flex-col md:flex-row lg:flex-row sm:gap-y-2 justify-content-center w-[40%]">
					<div className="mt-4">
						<h2 className="UserNick font-Nova min-[0px]:text-lg md:text-2xl font-semibold mr-8 uppercase">
							{usr.nickname}
						</h2>
					</div>
					{!who ? (
						<div className="flex flex-row mt-2">
							{isFriend ? 
							<img src={BlockPerson} className="mt-2 mr-4 h-[32px] w-[32px]" alt="..."></img> :
							<img src={AddPerson} className="mt-2 mr-4 h-[32px] w-[32px]" alt="..."></img>
							}
						</div>
					) : null}
				</div>
				<div className="flex flex-col mt-2 box-border">
					<p className="UserStatus text-xl mt-2 mr-4 ">{usr.connection_state}</p>
					{who ? (
						<div>
							<textarea
								className="UserDescription min-[0px]:mt-3 mr-4 sm:mt-3 md:mt-4 min-[0px]:text-base md:text-lg w-[90%] min-h-[5rem] max-h-[12rem] text-[#959490] ring-4 p-3 m-1 border-black ring-black hover:ring-blue shadow-[2px_4px_0px_0px_#000301]"
								placeholder={!usr?.status ? "Tell Us About Yourself ..." : usr?.status}
								onChange={(e) => setPostContent(e.target.value)}
							></textarea>
							<button
								type="submit"
								onClick={async () => await updateStatus()}
								className="border-black border-4 border-solid w-[25%] mt-6 font-Nova p-2 text-lg  text-white font-bold bg-black hover:bg-buttonColor hover:text-black  shadow-[2px_8px_6px_0px_#747474]"
							>
								{" "}
								submit
							</button>
						</div>
					) : (
						<p>{usr?.status}</p>
					)}
				</div>
			</div>
			<div className="RightDiv flex place-content-start lg:place-content-center w-[90%] lg:w-[40%] lg:m-auto py-6 lg:py-0">
				<img
					src={!usr || !usr.avatar ? Profil : usr.avatar}
					className="border-4 min-[0px]:h-[12rem] lg:h-[14rem] min-[0px]:w-[12rem] lg:w-[14rem] xl:w-[16rem] xl:h-[16rem] border-black border-solid shadow-[2px_4px_0px_0px_#000301]"
					alt="User profile picture"
				></img>
			</div>
		</div>
	);
}
