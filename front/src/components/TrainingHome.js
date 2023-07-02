import React from 'react'
import "../assets/styles/training.css"
import bg from '../img/home.png'
import { Tilt } from 'react-tilt'


function TrainingHome() {
  return (
    <>
   	<section class="home" id="home">
		<div class="home-text">
			<h6>CHASE PURPOSE... NOT MONEY</h6>
			<h1> More action you take,more progress you make</h1>
			<p>Knowledge is power, start learning new skills.</p>
            <div className='buttonContainer'>
              <button className='primary-btn' >
                <a href="#mentoring" className='href'>GET STARTED NOW </a>
              </button>
              <button className='btnn' >
             <a href="#courses" className='href'>SEE COURSES</a> 
              </button>
		</div>
        </div>
		<div class="home-img">
        <Tilt options={{ max: 35 , scale:1 }}>
			<img src={bg} />
            </Tilt>
		</div>
	</section>
  </>
  )
}

export default TrainingHome