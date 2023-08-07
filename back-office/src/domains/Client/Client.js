import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Client = () => {
  return (
    <div className='page'>
      
    <Outlet />
   
  </div>
  )
}

export default Client;