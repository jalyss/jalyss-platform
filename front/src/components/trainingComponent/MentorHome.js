import React, { useEffect } from "react";


const MentorHome = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <section class="mentorhome" id="home">
   <div class="mentorhome-text">
     <h6>COME TEACH WITH US</h6>
     <h1> Become a Mentor and change lives</h1>
     <p> — including your own</p>
           <div className='buttonContainer'>
            
            
   </div>
       </div>
  
 </section>
 </>
  )
}

export default MentorHome