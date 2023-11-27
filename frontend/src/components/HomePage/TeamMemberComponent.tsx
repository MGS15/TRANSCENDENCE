import Socials from './SocialMediaComponent'
import ProfilePic from '../../assets/profile.png'

export default function TeamMember(props: any){
	return (
		<div className={`Member ${props.Color} transition duration-500 ease-in-out font-pixelify max-w-[1536px] min-[0px]:place-content-center lg:p-4 min-[730px]:flex-row lg:flex min-[0px]:mx-5 border-solid border-2 p-9`}>
		  <div className={`${props.order} bg-white flex border-2 border-black border-solid place-content-center min-[0px]:w-[30%] sm:w-[30%] min-[0px]:ml-[13%] lg:m-auto lg:w-[20%]`}>
		  	<img src={ProfilePic} alt='pic' className=''></img >
		  </div>
		  <div className='flex-col justify-center w-[75%] lg:p-7 m-auto '>
			<h1 className='min-[0px]:text-xl md:text-2xl lg:text-3xl xl:text-5xl my-3'>{props.name}</h1>
			<Socials/>
		   <p className='min-[0px]:text-xl md:text-2xl xl:text-3xl my-3'> {props.description} </p>
		  </div>
		</div>
	);
}