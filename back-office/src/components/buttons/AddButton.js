import React from 'react'
import { Button } from '@mui/material'
import { IoIosPersonAdd } from 'react-icons/io'

function AddButton({type,onClick,onSubmit,endIcon,content,startIcon,Icon}) {

  return (
    <Button className='m-1' type={type?type:'button'} onClick={onClick} onSubmit={onSubmit} variant="outlined" endIcon={endIcon&&Icon} startIcon={startIcon&&Icon} style={{color:"blue"}}>
    <span className='btn btn-sm '>
      {content}
    </span>
  </Button>
  )
}

export default AddButton