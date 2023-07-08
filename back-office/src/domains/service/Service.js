import React from 'react'

import { Outlet } from 'react-router-dom';
function Service() {
  
  return (
    <div className='page'>
      <Outlet />
    </div>
  )
}

export default Service;