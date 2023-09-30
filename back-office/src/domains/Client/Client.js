import React from "react";

import { Outlet } from "react-router-dom";

const Client = () => (
  <div className="page">
    <Outlet />
  </div>
);

export default Client;
