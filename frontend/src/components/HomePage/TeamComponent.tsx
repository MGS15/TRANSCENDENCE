import TeamMembers from "./TeamMemberComponent";
import Spliter from "../Spliter";
import Choppa from "../../assets/choppa.png"
import Frank from "../../assets/frank.png"
import Sanji from "../../assets/sanji.png"
import Zoro from "../../assets/zoro.png"
import luffy from "../../assets/luffy.png"


export default function Team() {
	return (
		<div id="our-team">
			<Spliter title="OUR TEAM" />
			<div className="flex flex-col gap-y-12 max-w-[1536px] min-[0px]:mx-12 2xl:m-auto">
				<TeamMembers
					pic={Choppa}
					Color={"bg-primary"}
					order=""
					name="SOUFIANE ELKHAMLICHI"
					description="MGS, With his consistency and dedication put into his work, Can be highly effective in a team. By consistently meeting deadlines and delivering work on time, He demonstrates a diverse skill set encompassing front-end development, Back-end development, Design, And code structure."
				/>
				<TeamMembers
					pic={Frank}
					Color={"bg-buttonColor"}
					order={"order-last"}
					name="TAHA EL MOUHAJIR"
					description="PAJI1, With his quick thinking and problem-solving skills, Possesses the ability to effectively lead the team in a positive direction. His astute decision-making and proactive approach enable him to navigate challenges efficiently. AND HE LIKES EGGS FOR SURE. "
				/>
				<TeamMembers
					pic={Zoro}
					Color={"bg-JacobsBlueColor"}
					order=""
					name="OUAIL ZAHIR"
					description="WAEIL, much like Zoro, Our backend-development in the team. With a keen eye for detail and dedication to refining his craft, WAEIL effortlessly navigates the complexities of backend systems, much like Zoro wields his swords with unmatched precision.  WAEIL demonstrates commitment to our team's objectives, ensuring that backend operations are executed efficiently."
				/>
				<TeamMembers
					pic={Sanji}
					Color={"bg-secondary"}
					order={"order-last"}
					name="AYMANE ECHAFII"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed risus at nulla porttitor interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus quam a velit sodales pellentesque. Nulla congue, eros non vestibulum malesuada, risus nisl interdum elit, et sagittis nulla sapien congue leo. Duis sit amet sagittis odio, vel facilisis urna. Suspendisse sed ipsum nec ex tincidunt iaculis. Curabitur eget sagittis nunc, eget luctus quam."
				/>
				<TeamMembers
					pic={luffy}
					Color={"bg-errorColor"}
					order=""
					name="MAHMOUD MEZIANI"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed risus at nulla porttitor interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus quam a velit sodales pellentesque. Nulla congue, eros non vestibulum malesuada, risus nisl interdum elit, et sagittis nulla sapien congue leo. Duis sit amet sagittis odio, vel facilisis urna. Suspendisse sed ipsum nec ex tincidunt iaculis. Curabitur eget sagittis nunc, eget luctus quam."
				/>
			</div>
		</div>
	);
}
