import React from 'react'
import { Outlet } from 'react-router-dom'

function Command() {
  return (
    <div className='page'>
      
        <Outlet/>
    </div>
  )
}

export default Command