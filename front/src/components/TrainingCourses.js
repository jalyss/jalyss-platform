import React from 'react'
import { courses } from '../dummydata'
import TrainingHeading from './TrainingHeading'
import bg from "../img/course3.jpg"


const TrainingCourses = () => {
  return (
    <>
    <section class="courses" id="courses">
    <TrainingHeading  subtitle='COURSES' title='Explore Popular Courses'/>

    <div class="courses-content">
       {courses.map((e,i)=>
         <div class="roww" key={i}>
            <img src={bg} alt="../img/course3.jpg" />
            <div class="courses-text">
                <h5>{e.price}</h5>
                <h3>{e.title}</h3>
                <div className='startime'> 
                    <h6>&#9203;{e.time}</h6>
                    <div className='stars'>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐(5)</span>
                    </div>
                    </div>
               
              
            </div>

                    <button className='outline-btn'>DISCOVER NOW !</button>  
        </div>)}

        <button className='coursesbtn'>SEE COURSES </button>
    </div>

</section>
</>
  )
}

export default TrainingCourses