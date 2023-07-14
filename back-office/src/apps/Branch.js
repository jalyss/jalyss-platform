import React, { useMemo,useState } from 'react'
import Sidebar from '../layouts/Sidebar'
import Header from '../layouts/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FiAlignJustify } from "react-icons/fi";

function Branch() {

const [closeSideBar,setCloseState]=useState(false)
  
  const handleSidebarData = (data) => {
    setCloseState(!closeSideBar)
  };


  
  const { i18n } = useTranslation()
  const isRtl = useMemo(() => i18n?.languages[0] === 'ar', [i18n?.languages])

  return (
    <div>
      <div className={`d-flex `}>
        {
          !closeSideBar?

          <Sidebar onSidebarData={handleSidebarData} />:      <FiAlignJustify  color="black"  onClick={()=>{setCloseState(false)}}/>

        }
        <div className="w-100">
          <Header />
          <Box
            width="calc(100% - 260px)"
            mr={isRtl && '260px'}
            ml={!isRtl && '260px'}
            mt='80px'
            className="pages"
          >
            <Outlet />
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Branch
