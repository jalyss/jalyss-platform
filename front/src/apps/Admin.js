import React, { useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import { sidebarData } from "../constants/sidebarData";
import Header from "../layouts/Header";
import { RtlContext } from "../App";
import { Outlet } from "react-router-dom";

function Admin() {
  const isRtl = useContext(RtlContext);
  return (
    <div className={`d-flex  `}>
      <Sidebar sidebarData={sidebarData} />
      <div className="w-100">
        <Header />
        <Outlet/>
      </div>
    </div>
  );
}

export default Admin;
