import React from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { sidebarDataMain } from "../constants/sidebarDataMain";

function Main() {
  return (
    <div className={`d-flex `}>
      <Sidebar sidebarData={sidebarDataMain} />
      <div className="w-100">
        <Header />
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
