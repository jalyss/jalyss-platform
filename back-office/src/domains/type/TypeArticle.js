import React from 'react'
import { Outlet } from 'react-router-dom'

function TypeArticle() {
  return (
    <div>
       <div>
      <Outlet></Outlet>
    </div>
    </div>
  )
}

export default TypeArticle



