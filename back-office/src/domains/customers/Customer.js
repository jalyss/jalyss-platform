import React from 'react'
import { Outlet } from 'react-router-dom'

function Customer() {
  return (
    <div className='page'>
        <Outlet/>
    </div>
  )
}

export default Customer