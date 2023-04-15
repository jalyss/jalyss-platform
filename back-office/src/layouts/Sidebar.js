import React from "react";
import { Link } from "react-router-dom";
import isEnglish from "../helpers/isEnglish";

function Sidebar({ sidebarData }) {
  const isEng = isEnglish();
  return (
    <div className="bg-darkPurple sidebar">
      <div>
        <img alt="" src="" />
      </div>
      <div className="w-100 sidebarContent">
        {sidebarData.map((elem, i) => (
          <Link to={elem.path} className="w-100 sidebarItem">
              <span>{isEng ? elem.nameEn : elem.nameAr}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
