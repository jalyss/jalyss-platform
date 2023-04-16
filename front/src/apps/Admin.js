
import React, { useContext } from "react";
import SideBar from "../layouts/Sidebar";
import { sidebarData } from "../constants/sidebarData";
import Header from "../layouts/Header";
import { RtlContext } from "../App";
import { Outlet } from "react-router-dom";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Box } from "@mui/material";
function Admin() {
  const isRtl = useContext(RtlContext);
  return (
    <div className={`d-flex  `}>
      <ProSidebarProvider>
        <SideBar />
        <div className="w-100">
          <Header />
          <Outlet />

        </div>
      </ProSidebarProvider>
    </div>

  );
}

export default Admin;
