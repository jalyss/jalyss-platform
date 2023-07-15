import React, { useMemo, useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Branch() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const { i18n } = useTranslation();
  const isRtl = useMemo(() => i18n?.languages[0] === 'ar', [i18n?.languages]);

  return (
    <div>
      <Header isSidebarClosed={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
      <div className="d-flex">
        {isSidebarOpen && <Sidebar />}
        <div className="w-100" style={{ marginTop: '100px' }}>
          <Box 
            width={`calc(100% - ${isSidebarOpen ? '150px' : '0px'})`}
            mr={isRtl && isSidebarOpen ? '320px' : 0}
            ml={!isRtl && isSidebarOpen ? '320px' : 0}
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
