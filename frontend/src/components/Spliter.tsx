
export default function Spliter(props: any) {
	return (
		<div className='Feat flex items-center place-content-evenly mx-auto p-3 max-w-[1536px] my-5'>
		  <hr className='leftHr border-solid border-black border-2 w-[40%] rounded-full'></hr>
			<p className='gap-y-50 text-center text-3xl font-pixelify'>{props.title}</p>
		  <hr className='rightHr border-solid border-black border-2 w-[40%] rounded-full'></hr>
		</div> 
	);
}