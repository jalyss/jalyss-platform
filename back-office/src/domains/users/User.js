import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function User() {
  return (
    <div className='page'>
      <Link to='create'>Create User</Link>
        <Outlet/>
    </div>
  )
}

export default User