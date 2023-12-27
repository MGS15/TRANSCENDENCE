import AddPerson from "../../../assets/AddPerson.png";
import PersonAdded from "../../../assets/PersonAdded.png";
import BlockPerson from "../../../assets/BlockPerson.png";
import Profil from "../../../assets/profile.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfileDiv(props: any) {
	const [postContent, setPostContent] = useState("");
	const [Data, setData] = useState<any>(null);
	const test = async () => {
		const Number = 1; // TO-DO: NEEDS AUTH TO GET ACTUAL USER ID
		try {
			const response = await fetch(`http://localhost:3001/dashboard/getName/${Number}`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (!response.ok) {
				console.log("in failure", data);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			setData(data);
			console.log("in success", data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
	useEffect(() => {
		(async () => {
			await test();
		})();
	}, []);

	const updateStatus = async () => {
		const Number = 1;
		const response = await fetch(`http://localhost:3001/dashboard/statusPost/${Number}/${postContent}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		if (!response.ok) {
			console.log(data);
			alert(data);
			return;
		}
		else{
			setData((prevData: any) => ({
				...prevData,
				status: data.status,
			}
			));
			toast("Updated Succefully!")
		}
	};
	return (
		<div className="ProfileDiv Ft min-[0px]:mx-5 2xl:m-auto flex min-[0px]:flex-col-reverse lg:flex-row border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301] p-10 2xl:w-full max-w-[1536px]">
			<div className="LeftDiv flex flex-col lg:w-[75%]">
				<h1 className="ModUserName min-[0px]:text-xl md:text-3xl font-bold font-Nova uppercase">
					{!Data ? props.Username : Data.user42}
				</h1>
				<div className="SocialHolder flex min-[0px]:flex-col sm:flex-col md:flex-row lg:flex-row sm:gap-y-2 justify-content-center w-[40%]">
					<div className="mt-4">
						<h2 className="UserNick font-Nova min-[0px]:text-xl md:text-2xl font-semibold mr-8 uppercase">
							{!Data ? props.nickname : Data.nickname}
						</h2>
					</div>
					<div className="flex flex-row mt-2">
						<img src={AddPerson} className="mt-2 mr-4 h-[32px] w-[32px]" alt="..."></img>
						<img src={PersonAdded} className="mt-2 mr-4 h-[32px] w-[32px]" alt="..."></img>
						<img src={BlockPerson} className="mt-2 mr-4 h-[32px] w-[32px]" alt="..."></img>
					</div>
				</div>
				<div className="flex flex-col mt-2 box-border">
					<p className="UserStatus text-xl mt-2 mr-4 ">{props.State}</p>
					<textarea
						className="UserDescription min-[0px]:mt-3 mr-4 sm:mt-3 md:mt-4 min-[0px]:text-base md:text-lg w-[90%] min-h-[5rem] max-h-[12rem] text-[#959490] ring-4 p-3 m-1 border-black ring-black hover:ring-blue shadow-[2px_4px_0px_0px_#000301]"
						placeholder={!Data ? "Tell Us About Yourself ..." : Data.status}
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
			</div>
			<div className="RightDiv flex min-[0px]:place-content-start lg:place-content-center min-[0px]:w-[90%] lg:w-[40%] lg:m-auto py-4">
				<img
					src={(!Data || !Data.avatar)? Profil : Data.avatar}
					className="border-4 min-[0px]:h-[12rem] lg:h-[14rem] min-[0px]:w-[12rem] lg:w-[14rem] xl:w-[17rem] xl:h-[16rem] border-black border-solid shadow-[2px_4px_0px_0px_#000301]"
					alt="User profile picture"
				></img>
			</div>
		</div>
	);
}
