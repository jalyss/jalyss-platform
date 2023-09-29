import React from 'react'
import { Outlet } from 'react-router-dom'
const FunctionalArea = () => {
  return (
    <div className='page'>
      
    <Outlet />
   
  </div>
  )
}

export default FunctionalArea;