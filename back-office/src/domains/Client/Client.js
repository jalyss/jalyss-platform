import React from "react";
import { Link, Outlet } from "react-router-dom";
import ClientList from "./views/Clientlist";
const Client = () => {
  return (
    <div className="page">
      <ClientList />
    </div>
  );
};

export default Client;
