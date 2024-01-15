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
			if (event.origin === "http://localhost:3000") {
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
		const oauthUrl = "http://localhost:3001/auth/intra/login";
		var title = "OAuth Pop-up";
		var w = 600;
		var h = 300;
		const left = window.innerWidth / 2 - w / 2;
		const top = window.innerHeight / 2 - h / 2;
		popupWindowRef.current = window.open(oauthUrl, title, `width=${w},height=${h},left=${left},top=${top}`);
		console.log("her");
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);
	return (
		<div className="fixed z-10 inset-0 	flex items-center justify-center bg-black bg-opacity-50 m-4">
			<div className="bg-white p-6  font-Nova border-solid border-8 border-black shadow-[2px_4px_0px_0px_#000301]">
				<div className="b-50 m-32 mx-auto max-w-[1199px] flex justify-evenly">
					<div className="w-[40%] flex">
						<AnimatedElement/>
					</div>
					<div className="border-solid flex flex-col justify-around text-center gap-y-10 w-[50%]">
						<p className="font-extrabold text-3xl animate-pulse">Sign in, and let the games begin!</p>
						<p className="font-bold text-xl ">
							Ping-pong pal! It's been a minute, huh Recall the pixel paddle days? Get ready for a
							nostalgia wave your fave ping-pong platform beckons!
						</p>
						<div className="flex justify-center align-center">
							<button
								onClick={KarontdoIntra}
								className="flex gap-x-5 border-solid bg-buttonColor text-black py-2 px-40 border-black shadow-[2px_4px_0px_0px_#000301] border-2"
							>
								<img src={karontdo} className="w-[30px]"></img>
								NETWORK
							</button>
						</div>
					</div>
				</div>
				<button onClick={onClose} className="border-2 border-solid bg-buttonColor text-black py-2 px-5 border-black shadow-[2px_4px_0px_0px_#000301] w-[20%]">
					{" "}
					Close{" "}
				</button>
			</div>
		</div>
	);
};

export default Popup;
