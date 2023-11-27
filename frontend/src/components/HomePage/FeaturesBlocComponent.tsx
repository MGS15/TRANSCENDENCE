
export default function FeaturesBlocks(props:any){
	return (
		<div className={`Ft transition duration-500 ease ${props.Color} font-pixelify flex flex-col p-12 border-solid border-black border-2 text-2xl mb-10 gap-y-5 w-full`}>
			<img src={props.Pic} className='OV bg-white' alt='pic'></img>
			<h1 className='text-3xl font-medium'>{props.FeatureTitle}</h1>
			<p> {props.text} </p>
		</div>
	);
}