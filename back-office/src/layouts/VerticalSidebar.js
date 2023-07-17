import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarDataBranch } from '../constants/sidebarDataBranch';
import { Box, Typography } from '@mui/material';

function VerticalSidebar() {
  const location = useLocation();

  const isChildActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <Box
      className="verticalSidebar"
      border="1px solid #d9d9d9"
      position="fixed"
      top="100px"
      left="0"
      width="300px"
      backgroundColor="#f9f9f9"
    >
      {sidebarDataBranch.map((elem, index) => (
        <div key={index}>
          <Link to={elem.path}>
            <div
              className={`verticalSidebarItem ${
                location.pathname === elem.path && 'activeVerticalSidebarItem'
              } text-align-left`}
            >
              <Typography fontWeight={location.pathname === elem.path && 'bold'}>
                {elem.nameEn}
              </Typography>
            </div>
          </Link>
          {elem.children.map((child, j) => (
            <Link key={j} to={child.path}>
              <div
                className={`verticalSidebarChildItem ${
                  isChildActive(child.path) && 'activeVerticalSidebarChildItem'
                }`}
              >
                <Typography
                  fontWeight={isChildActive(child.path) && 'bold'}
                  ml={2}
                >
                  {child.nameEn}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </Box>
  );
}

export default VerticalSidebar;
