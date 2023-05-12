import React from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";
import { sidebarDataBranch } from "../constants/sidebarDataBranch";
import Header1 from "../layouts/Header1";
function Branch() {
  return (
    <div>
      <div className={`d-flex `}>
      
        <Sidebar sidebarData={sidebarDataBranch} />
        <div className="w-100">
          <Header />
          {/* <Header1/> */}
          <div className="pages">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branch;
