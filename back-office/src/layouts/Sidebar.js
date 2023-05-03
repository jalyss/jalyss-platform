import React from "react";
import { Link } from "react-router-dom";
import isEnglish from "../helpers/isEnglish";

function Sidebar({ sidebarData }) {
  const isEng = isEnglish();
  return (
    <div className="bg-darkPurple sidebar">
      <div className="w-100 sidebarContent">
        {sidebarData.map((elem, i) => (
          <div>
            <Link to={elem.path} className="w-100 sidebarItem">
              <span>{isEng ? elem.nameEn : elem.nameAr}</span>
            </Link>
            {elem.children.length > 0 && elem.children.map((el, j) => (
              <Link to={elem.path+"/"+el.path} className="w-100 sidebarItem">
                <span>{isEng ? el.nameEn : el.nameAr}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
