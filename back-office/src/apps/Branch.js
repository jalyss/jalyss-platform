import React from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";
import { sidebarDataBranch } from "../constants/sidebarDataBranch";
function Branch() {
  return (
    <div>
      <div className={`d-flex `}>
        <Sidebar sidebarData={sidebarDataBranch} />
        <div className="w-100">
          <Header />
          <div className="pages">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branch;
