import React from 'react'

function UpdateButton({mt,mb,onClick}) {
  return (
    <button
        className="outline"
        style={{ marginTop: mt, marginBottom: mb ,fontWeight:500}}
        onClick={onClick}
      >
       Update
      </button>
  )
}

export default UpdateButton
