import React , { Fragment } from 'react'
import TrainingHome from '../components/trainingComponent/TrainingHome'
import TrainingAbout from '../components/trainingComponent/TrainingAbout'
import TrainingCourses from '../components/trainingComponent/TrainingCourses'
import TrainingPricing from '../components/trainingComponent/TrainingPricing'
import TrainingTestimonial from '../components/trainingComponent/TrainingTestimonial'
import TrainingCategories from '../components/trainingComponent/TrainingCategories'
import TrainingMentor from '../components/trainingComponent/TrainingMentor'
import Faq from '../components/Faq'

function TrainingPage() {
  return (
    <Fragment>
    <TrainingHome/>

    {/* <TrainingMentor/> */}
    {/* <TrainingAbout/> */}
    <TrainingCourses/>
    <TrainingTestimonial/>
    {/* <TrainingCategories/> */}
    <Faq/>
  </Fragment>
  )
}

export default TrainingPage