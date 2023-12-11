import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar";

import "./index.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout__outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
