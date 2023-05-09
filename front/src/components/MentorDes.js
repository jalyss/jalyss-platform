import React from 'react'
import TrainingHeading from './TrainingHeading'

import teach from "../img/teach.png"
import inspire from "../img/inspire.png"
import road from "../img/roadToS.png"

const MentorDes = () => {
  return (
    <>
      
   <section> <TrainingHeading  title='SO MANY REASONS TO START' /></section>
     
    
  

   <div className="About_container">
   <div>
       
        <div className="icon-row">
        <div className="icon">
  <img src={teach} alt="teach Icon" />
  <h3>Teach with style</h3>
  <p className='para'>Publish the course you want, in the style you want, and  be in charge of your own material.</p>
</div>
<div className="icon">
  <img src={inspire} alt="inspire" />
  <h3>Stir learners</h3>
  <p className='para'>Teach what you know and assist students in exploring their interests, learning new skills</p>
</div>
<div className="icon">
  <img src={road} alt="sucess road" />
  <h3>Acheive more success.</h3>
  <p className='para'>Develop your professional abilities, gain expertise, and achieve your goals. </p>
</div>
          
        </div>
        </div>
      </div>
      
   
    </>
  )
}

export default MentorDes