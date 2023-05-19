import React from 'react'
import { Outlet } from 'react-router-dom'

function Commands() {
  return (
    <div className='page'>
        <Outlet/>
    </div>
  )
}

export default Commands