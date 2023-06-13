import React , { Fragment } from 'react'
import TrainingHome from '../components/TrainingHome'
import TrainingAbout from '../components/TrainingAbout'
import TrainingCourses from '../components/TrainingCourses'
import TrainingPricing from '../components/TrainingPricing'
import TrainingTestimonial from '../components/TrainingTestimonial'
import TrainingCategories from '../components/TrainingCategories'
import TrainingMentor from '../components/TrainingMentor'
import Faq from '../components/Faq'

function TrainingPage() {
  return (
    <Fragment>
    <TrainingHome/>

    {/* <TrainingMentor/> */}
    {/* <TrainingAbout/> */}
    <TrainingCourses/>
    {/* <TrainingPricing/> */}
    <TrainingTestimonial/>
    {/* <TrainingCategories/> */}
    <Faq/>
  </Fragment>
  )
}

export default TrainingPage