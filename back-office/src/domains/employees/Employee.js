import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Employee() {
  return (
    <div className='page'>
      
        <Outlet/>
    </div>
  )
}

export default Employee