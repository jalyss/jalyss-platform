import React, { useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import { sidebarData } from "../constants/sidebarData";
import Header from "../layouts/Header";
import { RtlContext } from "../App";

function Admin() {
  const isRtl = useContext(RtlContext);
  return (
    <div className={`d-flex  `}>
      <Sidebar sidebarData={sidebarData} />
      <div className="w-100">
        <Header />
      </div>
    </div>
  );
}

export default Admin;
