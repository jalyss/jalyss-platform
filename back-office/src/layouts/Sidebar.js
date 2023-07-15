import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import isEnglish from "../helpers/isEnglish";
import { sidebarDataBranch } from "../constants/sidebarDataBranch";
import Logo from "../assets/logo.jpg";
import { Box, Typography } from "@mui/material";
import { AiOutlineDown ,AiOutlineUp} from "react-icons/ai";

function Sidebar() {
  const isEng = isEnglish();
  const location = useLocation();

  const [activeItems, setActiveItems] = useState([]);

  const handleItemClick = (path) => {
    if (activeItems.includes(path)) {
      setActiveItems(activeItems.filter((item) => item !== path));
    } else {
      setActiveItems([path]);
    }
    console.log(activeItems, "isIA");
  };

  const isItemActive = (path) => {
    return activeItems.includes(path);
    
  };

  const isChildActive = (path) => {
    return location.pathname.includes(path);
    
  };

  return (
    <Box
      className="sidebar"
      borderRight={isEng ? "1px solid #d9d9d9" : "none"}
      borderLeft={!isEng ? "1px solid #d9d9d9" : "none"}
    >
      <div className="sidebarHeader">
        <img style={{ height: 100 }} src={Logo} alt="logo" />
        {/* <AiOutlineDown color="black"/> */}
      </div>
      <div className="sidebarContent">
        {sidebarDataBranch.map((elem, index) => {
          const isActive = isItemActive(elem.path);
          return (
            <div key={index}>
              <div
                onClick={() => handleItemClick(elem.path)}
                style={{
                  borderLeft: isActive && !isEng && "2px solid #48184c",
                  borderRight: isActive && isEng && "2px solid #48184c",
                }}
                className={`sidebarItem ${isActive && "activeSidebarItem"} justify-content-between`}
              >
                <Typography fontWeight={isActive && "bold"}>
                  {isEng ? elem.nameEn : elem.nameAr}
                </Typography>
                {elem.children.length!==0&&(!isActive?<AiOutlineDown color="black"/>:<AiOutlineUp color="black"/>)}
              </div>
              {isActive && elem.children.length > 0 && (
                <div className="sidebarChildren">
                  {elem.children.map((el, j) => {
                    const isActiveChildren = isChildActive(el.path);
                    return (
                      <Link
                        key={j}
                        to={el.path}
                        style={{
                          paddingLeft: isEng && "50px",
                          paddingRight: !isEng && "50px",
                          borderLeft:
                            isActiveChildren && !isEng && "2px solid #48184c",
                          borderRight:
                            isActiveChildren && isEng && "2px solid #48184c",
                        }}
                        className={`sidebarItem ${
                          isActiveChildren && "activeSidebarItem"
                        }`}
                      >
                        <Typography fontWeight={isActiveChildren && "bold"}>
                          • {isEng ? el.nameEn : el.nameAr}
                        </Typography>
                       
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Box>
  );
}

export default Sidebar;