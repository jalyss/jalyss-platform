import React from 'react'
import { Link, Outlet } from 'react-router-dom'




function User() {
  return (
    <div className='page'>
      
      <Outlet />
     
    </div>
  )
}

export default User