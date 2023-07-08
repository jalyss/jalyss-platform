import React from 'react'

function ButtonWithTransformAndHover({title,onClick,mt,full}) {
  return (
    <div>
    <button className={full ? "full transformHover " : "outline transformHover"} 
     style={{ backgroundColor: full ? "#790BE0" : "",marginTop:mt }}  onClick={onClick}>{title}</button>
</div>
  )
}

export default ButtonWithTransformAndHover
