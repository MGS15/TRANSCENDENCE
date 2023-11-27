import GameBoy from '../../assets/GameBoy.png'

export default function HomePageDiv(){
	return (
	  <div className='bg-BkColor min-[0px]:flex-row sm:flex-row md:flex-row lg:flex sm:mx-5 2xl:m-auto justify-between items-center rounded-3xl box-border p-3 max-w-[1536px]'>
		<div className='flex flex-col min-[0px]:place-items-center min-[1199px]:items-start min-[1199px]:w-full p-3 gap-y-11 m-4 w-[auto]'>
			<p className='TrTitle text-primary min-[0px]:text-4xl min-[545px]:text-6xl min-[1199px]:text-7xl font-pixelify'>TRANSCENDENCE PINGPONG GAME</p>
			<p className='min-[0px]:text-xl text-2xl font-Actor capitalize'>Step back into the 90s with our website, a nostalgic trip to the world of ping-pong gaming. Relive the classic games, iconic moments, and the unique charm of that era. Whether you're a seasoned player or a curious newcomer, we're here to celebrate the enduring magic of 90s ping-pong.</p>
			<button className='min-[0px]:text-xl min-[545px]:text-2xl bg-buttonColor rounded-full font-pixelify border-solid border-2 border-black shadow-[2px_4px_0px_0px_#000301] p-4 w-1/2'>JOIN US NOW</button>
		</div>
		<div className='min-[0px]:hidden min-[1199px]:flex min-[1199px]:w-full m-4 flex place-content-center '>
			<img src={GameBoy} className='GameBoy' alt='pic'/>
		</div>
	  </div>
	);
  }