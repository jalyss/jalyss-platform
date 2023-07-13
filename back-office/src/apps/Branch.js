import React, { useMemo, useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Branch() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const { i18n } = useTranslation();
  const isRtl = useMemo(() => i18n?.languages[0] === 'ar', [i18n?.languages]);

  return (
    <div>
      <div className="d-flex">
        {!isSidebarOpen && <Sidebar />}
        <div className="w-100">
          <Header isSidebarClosed={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
          <Box
            width={`calc(100% - ${isSidebarOpen ? '260px' : '0px'})`}
            mr={isRtl && '260px'}
            ml={!isRtl && '260px'}
            mt={isSidebarOpen && '80px'}
            className="pages"
          >
            <Outlet />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Branch;
