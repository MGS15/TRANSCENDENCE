import React from 'react';
import ReactDOM from 'react-dom/client';
import Trophy_1 from '../../assets/Throphy-01.png'
import Trophy_2 from '../../assets/Throphy-02.png'
import Trophy_3 from '../../assets/Throphy-03.png'
import Trophy_4 from '../../assets/Throphy-04.png'
import Trophy_5 from '../../assets/Throphy-05.png'
import Trophy_6 from '../../assets/Throphy-06.png'
import Trophy_7 from '../../assets/Throphy-07.png'
import Trophy_8 from '../../assets/Throphy-08.png'
import Trophy_9 from '../../assets/Throphy-09.png'
import Trophy_10 from '../../assets/Throphy-10.png'
import LeftArrow from  '../../assets/PointerLeft.png'
import RightArrow from  '../../assets/PointerRight.png'

function TrophyGenerator(props: any){
  return (
	  <div className='TrophyContainer flex-shrink-0 flex flex-col justify-items-center m-5'>
		<img src={props.TrophyPic} className='h-[150px] w-[150px] flex-shrink-0'></img>
		<p className='text-xl text-center font-Pixels line-clamp-2'>{props.TrophyName}</p>
	</div>
  );
}

function TrophySlide()
{
  return (
      <section className='SlideContainer flex flex-row overflow-x-auto justify-content-center h-[250px] w-full'>
      <div className='h-full w-auto'>
        <button className='border-black shadow-[5px_0px_4px_0px_#000301] border-solid border-2 h-full w-auto'>
         <img src={LeftArrow} className=''></img>
        </button>
      </div>
      <div className='hh flex flex-shrink-0 flex-row w-full justify-content-center'>
        <TrophyGenerator TrophyName='Joining The Team' TrophyPic={Trophy_1}/>
        <TrophyGenerator TrophyName='First Win' TrophyPic={Trophy_2}/>
        <TrophyGenerator TrophyName='3 Consecutive Wins' TrophyPic={Trophy_3}/>
        <TrophyGenerator TrophyName='Achievement 1' TrophyPic={Trophy_4}/>
        <TrophyGenerator TrophyName='Achievement 2' TrophyPic={Trophy_5}/>
        <TrophyGenerator TrophyName='Achievement 3' TrophyPic={Trophy_6}/>
        <TrophyGenerator TrophyName='Achievement 3' TrophyPic={Trophy_7}/>
        <TrophyGenerator TrophyName='Achievement 4' TrophyPic={Trophy_8}/>
        <TrophyGenerator TrophyName='Achievement 5' TrophyPic={Trophy_9}/>
        <TrophyGenerator TrophyName='Achievement 6' TrophyPic={Trophy_10}/>
      </div>
      <div className='h-full w-auto'>c
        <button className='border-black shadow-[-5px_0px_4px_0px_#000301] border-solid border-2 h-full w-auto'>
         <img src={RightArrow} className=''></img>
        </button>
      </div>
      </section>
  );
}
