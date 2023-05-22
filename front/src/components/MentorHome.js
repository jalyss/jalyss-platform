import React, { useEffect } from "react";
import bg from '../img/Capture1.PNG'

const MentorHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

      var colors = ["white","black","aqua"]
var currentColor = 0
var lis = document.querySelectorAll(".teach-btn")
function changeColor() {
  --currentColor
  if (currentColor < 0) currentColor = colors.length -1
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.color = colors[(currentColor +i) % colors.length]
  }
}
setInterval(changeColor, 1000)
  return (
    <>
    <section class="mentorhome" id="home">
   <div class="mentorhome-text">
     <h6>COME TEACH WITH US</h6>
     <h1> Become a Mentor and change lives</h1>
     <p> — including your own</p>
           <div className='buttonContainer'>
             <button className='teach-btn'>
               GET STARTED NOW 	&#8594;
             </button>
            
   </div>
       </div>
  
 </section>
 </>
  )
}

export default MentorHome