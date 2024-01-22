export default function FeaturesBlocks(props: any) {
	return (
		<div
			className={`Ft transition duration-500 ease ${props.Color} font-pixelify flex flex-col p-6 md:p-16 mb-16 gap-y-8 text-2xl mb-18 w-full border-solid border-4 border-black shadow-[2px_4px_0px_0px_#000301]`}
		>
			<img
				src={props.Pic}
				className="m-auto OV bg-DefaultColor border-solid border-4 border-black w-[87%]"
				alt="pic"
			></img>
			<h1 className="text-xs sm:text-base md:text-xl text-left lg:text-3xl font-medium">{props.FeatureTitle}</h1>
			<p className="text-xs sm:text-base md:text-xl lg:text-2xl"> {props.text} </p>
		</div>
	);
}
