import React from 'react';
import ReactDOM from 'react-dom/client';
import Socials from './SocialMediaComponent'
import ProfilePic from './assets/profile.png'

function TeamMembers(props: any){
	return (
	  <div className='Container'>
		<div className='Member'>
		  <img src={ProfilePic} alt='pic' ></img >
		  <div>
			<h1>{props.name}</h1>
			<Socials/>
		   <p> {props.description} </p>
		  </div>
		</div>
	</div>
	);
}