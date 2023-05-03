import React, { useEffect, useState } from "react";
import bg from '../img/home.png'
import { Tilt } from 'react-tilt'


const TrainingMentor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <section class="home" id="home">
		<div class="home-text">
			<h6>CHASE PURPOSE... NOT MONEY</h6>
			<h1> More action you take,more progress you make</h1>
			<p>Knowledge is power, start learning new skills.</p>
            <div className='buttonContainer'>
              <button className='primary-btn'>
                GET STARTED NOW 	
              </button>
              <button className='btn'>
              SEE COURSES 
              </button>
		</div>
        </div>
		<div class="home-img">
        <Tilt options={{ max: 35 , scale:1 }}>
			<img src={bg} />
            </Tilt>
		</div>
	</section>
  )
}

export default TrainingMentor