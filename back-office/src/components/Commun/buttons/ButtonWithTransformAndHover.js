import React from 'react'

function ButtonWithTransformAndHover({title,onClick,style,full}) {
  return (
    <div>
    <button className={full ? "full transformHover " : "outline transformHover"} 
     style={{ backgroundColor: full ? "#790BE0" : "" }}  onClick={onClick}>{title}</button>
</div>
  )
}

export default ButtonWithTransformAndHover
