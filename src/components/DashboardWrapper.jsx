import React from "react";
import Sidebar from "./Sidebar";
import Header from "./HeaderAdmin";

const DashboardWrapper = ({ children, title }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="ml-[0%] lg:ml-[20%] px-0 lg:px-1 xl:px-10  w-full bg-[#F3F4FF] flex flex-col overflow-y-auto">
        {/* Header */}
        <Header title={title} />

        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
