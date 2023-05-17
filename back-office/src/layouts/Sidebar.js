import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import isEnglish from '../helpers/isEnglish';
import { sidebarDataBranch } from '../constants/sidebarDataBranch';
import Logo from '../assets/logo.jpg';
import { Box, Typography } from '@mui/material';

function Sidebar() {
  const isEng = isEnglish();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState('');

  const handleDropdownClick = (path) => {
    setActiveDropdown(path === activeDropdown ? '' : path);
  };

  return (
    <Box
      className="sidebar"
      borderRight={isEng && '1px solid #d9d9d9'}
      borderLeft={!isEng && '1px solid #d9d9d9'}
    >
      <div className="d-flex justify-content-center align-items-center">
        <img width={120} src={Logo} alt="logo" />
      </div>
      {sidebarDataBranch.map((elem, index) => {
        const isActive =
          location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === elem.path;
        const isDropdownActive = elem.children.length > 0 && elem.path === activeDropdown;
        const hasChildren = elem.children.length > 0;

        return (
          <div key={index}>
            {hasChildren ? (
              <div
                onClick={() => handleDropdownClick(elem.path)}
                style={{
                  borderLeft: isActive && !isEng ? '2px solid #48184c' : '',
                  borderRight: isActive && isEng ? '2px solid #48184c' : '',
                }}
                className={`sidebarItem ${isActive ? 'activeSidebarItem' : ''}`}
              >
                <Typography fontWeight={isActive ? 'bold' : 'normal'}>
                  {isEng ? elem.nameEn : elem.nameAr}
                </Typography>
              </div>
            ) : (
              <Link
                to={'/' + elem.path}
                style={{
                  borderLeft: isActive && !isEng ? '2px solid #48184c' : '',
                  borderRight: isActive && isEng ? '2px solid #48184c' : '',
                }}
                className={`sidebarItem ${isActive ? 'activeSidebarItem' : ''}`}
              >
                <Typography fontWeight={isActive ? 'bold' : 'normal'}>
                  {isEng ? elem.nameEn : elem.nameAr}
                </Typography>
              </Link>
            )}

            {isDropdownActive &&
              elem.children.map((el, j) => {
                const isActiveChildren =
                  location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === el.path;

                return (
                  <div key={j}>
                    <Link
                      to={'/' + el.path}
                      style={{
                        paddingLeft: isEng ? '50px' : '',
                        paddingRight: !isEng ? '50px' : '',
                        borderLeft: isActiveChildren && !isEng ? '2px solid #48184c' : '',
                        borderRight: isActiveChildren && isEng ? '2px solid #48184c' : '',
                      }}
                      className={`sidebarItem ${isActiveChildren ? 'activeSidebarItem' : ''}`}
                    >
                      <Typography fontWeight={isActiveChildren ? 'bold' : 'normal'}>
                        • {isEng ? el.nameEn : el.nameAr}
                      </Typography>
                    </Link>
                  </div>
                );
              })}
          </div>
        );
      })}
    </Box>
  );
}

export default Sidebar
