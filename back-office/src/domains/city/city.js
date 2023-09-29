import React from 'react'
import { Outlet } from 'react-router-dom'
const Cities = () => {
  return (
    <div className='page'>
      
    <Outlet />
   
  </div>
  )
}

export default Cities;