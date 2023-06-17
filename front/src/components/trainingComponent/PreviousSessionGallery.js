import React from 'react'
import CarouselImages from '../Carousel'
import TrainingHeading from '../TrainingHeading'
function PreviousSessionGallery() {
  return (
    <div className='mb-5'>
    <TrainingHeading
    subtitle="Previous Session Gallery"
    title="Best moments"
    mt={20}
    mb={40}
  />
   <CarouselImages images={[
    'https://www.enicbcmed.eu/sites/default/files/2021-11/Formation.jpg',
    'https://www.lecoindesentrepreneurs.fr/wp-content/uploads/2020/01/cr%C3%A9er-une-soci%C3%A9t%C3%A9-de-formation.png',
    "https://thumbs.dreamstime.com/b/food-eating-family-concept-group-people-having-breakfast-sitting-table-group-people-having-breakfast-table-113083220.jpg",
    'https://www.cidj.com/sites/default/files/2021-11/l-offre-de-formation-2022-du-cidj_3.png',
    'https://www.benin.campusfrance.org/sites/pays/files/benin/styles/mobile_visuel_principal_page/public/formations%20pro.jpg?itok=Fb6u0xbO'
  ]} 
 br={"20px"}
 height={"450px"}
  />
  </div>
  )
}

export default PreviousSessionGallery
