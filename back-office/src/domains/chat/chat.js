import React from 'react'

import { Outlet } from 'react-router-dom';
function Chat() {
  
  return (
    <div className='page'>
      <Outlet />
    </div>
  )
}

export default Chat