import React from 'react';
import ReactDOM from 'react-dom/client';

export default function FeaturesBlocks(props:any){
	return (
		<div className={` ${props.Color} flex flex-col p-10 border-solid border-black border-2 text-2xl rounded-xl mb-10 gap-y-5 w-full`}>
			<img src={props.Pic} className='OV bg-white' alt='pic'></img>
			<h1>{props.FeatureTitle}</h1>
			<p> {props.text} </p>
		</div>
	);
}