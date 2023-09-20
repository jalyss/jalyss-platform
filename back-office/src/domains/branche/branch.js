import React from "react";
import { Outlet } from "react-router-dom";

function Branches() {
  return (
    <div className="page">
      <Outlet />
    </div>
  );
}

export default Branches;
