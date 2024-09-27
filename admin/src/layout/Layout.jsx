import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

function Layout() {
  return (
    <>
      <div className="flex min-h-[100dvh]">
        <SideBar />
        <main className="flex-1 h-auto">
          <Header />
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
