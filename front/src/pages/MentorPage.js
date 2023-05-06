import React , { Fragment } from 'react'
import MentorHome from '../components/MentorHome'
import MentorDes from '../components/MentorDes'
import MentorSteps from '../components/MentorSteps'



function MentorPage() {
  return (
    <Fragment>
    <MentorHome/>
    <MentorDes/>
    <MentorSteps/>
  </Fragment>
  )
}

export default MentorPage