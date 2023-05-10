import React from 'react'

import { Outlet } from 'react-router-dom';
function Article() {
  
  return (
    <div className='page'>
      <Outlet />
    </div>
  )
}

export default Article