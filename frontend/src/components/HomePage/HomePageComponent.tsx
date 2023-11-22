import GameBoy from '../../assets/GameBoy.png'

export default function HomePageDiv(){
	return (
	  <div className='bg-WelcomePageBeige min-[0px]:flex-row sm:flex-row md:flex-row lg:flex items-center rounded-3xl box-border w-full p-4'>
		<div className='flex flex-col items-start pl-12  gap-y-6 m-4 w-[70%]'>
			<p className='text-TrColor text-7xl font-Pixels'>TRANSCENDENCE PINGPONG GAME</p>
			<p className='text-2xl font-Pixels capitalize'>Step back into the 90s with our website, a nostalgic trip to the world of ping-pong gaming. Relive the classic games, iconic moments, and the unique charm of that era. Whether you're a seasoned player or a curious newcomer, we're here to celebrate the enduring magic of 90s ping-pong.</p>
			<button className='text-2xl bg-HeaderYellow rounded-full font-Pixels border-solid border-2 border-black shadow-[2px_4px_0px_0px_#000301] p-4 w-1/2'>JOIN US NOW</button>
		</div>
		<div className='w-auto min-[0px]:invisible sm:invisible md:visible m-4'>
			<img src={GameBoy} className='GameBoy' alt='pic'/>
		</div>
	  </div>
	);
  }