import React from 'react'
import CarouselImages from '../Commun/Carousel'
import TrainingHeading from '../Commun/TrainingHeading'
function PreviousSessionGallery({previousSesion,subtitle}) {
console.log("preGaaal",previousSesion);


let gal = [];
for (let i = 0; i < previousSesion?.MediaSession.length; i++) {
  gal.push(previousSesion?.MediaSession[i].media.path);
}

console.log(gal,"gall");

  return (
    <div className='mb-5'>
      {gal.length >0 &&
      <>
      <TrainingHeading
      subtitle={subtitle}
      title="Best moments"
      mt={20}
      mb={40}
    />
     <CarouselImages images={gal} 
   br={"20px"}
   height={"450px"}
    /> </>}
    
  </div>
  )
}

export default PreviousSessionGallery
