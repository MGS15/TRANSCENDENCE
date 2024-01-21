import React, { useEffect, useRef, useState } from "react";
import karontdo from "../../assets/42.png";
import { AnimatedElement } from "../game/GameSetup";

interface PopupProps {
	onClose: () => void;
	setPopupSignUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setPopupSignInVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setloginuser: React.Dispatch<React.SetStateAction<string>>;
}


const Popup: React.FC<PopupProps> = ({ onClose, setPopupSignUpVisible, setPopupSignInVisible, setloginuser }) => {
	const popupWindowRef = useRef<any>(null);
	const [hasHandledMessage, setHasHandledMessage] = useState(false);
	useEffect(() => {
		const handleMessage = (event: any) => {
			if (event.origin === "http://hahach.ddns.net:3000") {
				if (event.data.success) {
					onClose();
					console.log(JSON.parse(event.data.payload));
					const payload = JSON.parse(event.data.payload);
					if (payload && payload.userData && payload.userData.signUpstate === true) {
						setloginuser(payload.userData.user);
						setPopupSignInVisible(true);
					} else setPopupSignUpVisible(true);
					console.log(JSON.parse(event.data.payload).userData.signUpstate);
					popupWindowRef.current.close();
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	const KarontdoIntra = () => {
		const oauthUrl = "http://hahach.ddns.net:3001/auth/intra/login";
		var title = "OAuth Pop-up";
		var w = 600;
		var h = 300;
		const left = window.innerWidth / 2 - w / 2;
		const top = window.innerHeight / 2 - h / 2;
		popupWindowRef.current = window.open(oauthUrl, title, `width=${w},height=${h},left=${left},top=${top}`);
		console.log("her");
	};

	// useEffect(() => {
	// 	document.body.style.overflow = "hidden";
	// 	return () => {
	// 		document.body.style.overflow = "unset";
	// 	};
	// }, []);
	return (
		<div className="fixed z-10 inset-0  flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-DefaultColor p-6  font-Nova border-solid border-8 border-black shadow-[2px_4px_0px_0px_#000301] m-[12%] max-sm:max-w-[90%]" >
				<div className="b-50 m-[11%] mx-auto  max-sm:max-w-[90%] flex justify-evenly">
				<div className="hidden w-[40%] lg:flex">
						<AnimatedElement/>
					</div>

					<div className="border-solid flex flex-col justify-around  items-center text-center gap-y-10 w-[95%] md:w-[70%] lg:w-[45%]">
						<p className="font-extrabold text-xl md:text-3xl animate-pulse">Sign in, and let the games begin!</p>
						<p className="font-bold text-sm md:text-xl lg:text-center">
							Ping-pong pal! It's been a minute, huh Recall the pixel paddle days? Get ready for a
							nostalgia wave your fave ping-pong platform beckons!
						</p>
						{/* <div className="flex justify-center"> */}
							<button
								onClick={KarontdoIntra}
								className="flex md:gap-x-5 border-solid bg-buttonColor text-black border-black shadow-[2px_4px_0px_0px_#000301] border-2 justify-center items-center w-[90%] sm:w-[55%] md:w-[50%] lg:w-[65%] sm:gap-x-2 p-2">
								<img src={karontdo} className="h-[2rem] w-[2rem] mx-2 sm:mx-4 md:mx-0"></img>
								<p className="font-bold text-xs sm:text-base">NETWORK</p>
							</button>
						{/* </div> */}
					</div>
				</div>

				<button onClick={onClose} className="p-2 font-bold text-xs md:text-xl border-2 border-solid bg-buttonColor text-black border-black shadow-[2px_4px_0px_0px_#000301] w-[35%] sm:w-[20%]">
					{" "}
					Close{" "}
				</button>
			</div>
		</div>
	);
};

export default Popup;