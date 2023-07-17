import React from 'react'
import { Outlet } from 'react-router-dom'

function Command() {
  return (
    <div className='page'>
      
       <Outlet></Outlet>
    </div>
  )
}

export default Command