import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
//import Dashboard from "viewsDashboard.js";
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Profile from "views/admin/Profile.js";

export default function Admin() {
  return (
    <>
    <Routes>
      {/*<Route path="dashboard" element={<Dashboard />} />
      <Route path="maps" element={<Maps />} />
      <Route path="settings" element={<Settings />} />
      <Route path="tables" element={<Tables />} /> */}
      <Route path="profile" element={<Profile />} />
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
      {/*<Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="maps" element={<Maps />} />
            <Route path="settings" element={<Settings />} />
            <Route path="tables" element={<Tables />} /> 
            <Route path="" element={<Navigate to="dashboard" replace />} />
          </Routes>
          <FooterAdmin />
        </div>
      </div> */}
    </>
  );
}
