import React from 'react'

const TrainingHeading = ({ subtitle, title,mt,mb }) => {
  return (
    <>
    <div className='text-center' style={{marginTop:mt,marginBottom:mb}} >
      <h3>{subtitle} </h3>
      <h1>{title} </h1>
    </div>
  </>
  )
}

export default TrainingHeading