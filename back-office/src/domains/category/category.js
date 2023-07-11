import React from 'react'

import { Outlet } from 'react-router-dom';
function Category() {
  
  return (
    <div className='page'>
      <Outlet />
    </div>
  )
}

export default Category