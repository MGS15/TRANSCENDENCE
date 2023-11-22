import AddPerson from './assets/AddPerson.png'
import PersonAdded from './assets/PersonAdded.png'
import BlockPerson from './assets/BlockPerson.png'
import ChatLogo from './assets/Bubble.png'

function ProfileDiv(props: any){
	return (
	  <div className='BigBoy w-full'>
		<div className='ProfileDiv flex min-[0px]:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-row justify-content-evenly border-solid border-2 border-black shadow-[2px_4px_0px_0px_#000301] w-full p-5'>
		  <div className='LeftDiv flex flex-col w-auto '>
		  <h1 className='ModUserName text-3xl font-Pixels'>{props.Username}</h1>
		   <div className='SocialHolder flex min-[0px]:flex-col sm:flex-col md:flex-row lg:flex-row sm:gap-y-2 justify-content-center w-[40%]'>
			<div className='mt-4'>
			  <h2 className='UserNick font-Actor text-2xl mr-8'>{props.nickname}</h2>
			</div>
			<div className='flex flex-row mt-2'>
			  <img src={AddPerson} className='mt-2 mr-4 h-[32px] w-[32px]'></img>
			  <img src={PersonAdded}className='mt-2 mr-4 h-[32px] w-[32px]'></img>
			  <img src={BlockPerson}className='mt-2 mr-4 h-[32px] w-[32px]'></img>
			  <img src={ChatLogo}className='mt-2 mr-4 h-[32px] w-[32px]'></img>
			</div>
			</div>
			<div className='flex flex-col mt-2 box-border'>
			  <p className='UserStatus text-xl mt-2 mr-4 '>{props.State}</p>
			  <p className='UserDescription text-2xl min-[0px]:mt-3 mr-4 sm:mt-3 md:mt-5'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante est, pulvinar ut elementum ut, venenatis vitae ante. Maecenas ac sodales est, eu ullamcorper nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat.
			  </p>
			</div>
			</div>
			<div className='RightDiv flex place-content-center lg:w-[40%] p-5'>
			<img src={props.ProfilePic} className='border-2 border-black'></img>
		  </div>
		</div>
	  </div>
	);
  }