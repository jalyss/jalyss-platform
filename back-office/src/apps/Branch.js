import React, { useMemo } from 'react'
import Sidebar from '../layouts/Sidebar'
import Header from '../layouts/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Branch() {
  const { i18n } = useTranslation()
  const isRtl = useMemo(() => i18n?.languages[0] === 'ar', [i18n?.languages])

  return (
    <div>
      <div className={`d-flex `}>
        <Sidebar />
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