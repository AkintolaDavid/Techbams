import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardWrapper from "./components/DashboardWrapper";
import Addcoursepage from "./Addcoursepage";
import UsersAdminpage from "./UsersAdminpage";
import CourseAdminPage from "./CourseAdminPage";
import ContactAdminPage from "./ContactAdminPage";

const AdminPage = () => {
  return (
    <DashboardWrapper title="Admin Dashboard">
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="addcoursepage" replace />} />
        <Route path="addcoursepage" element={<Addcoursepage />} />
        <Route path="usersadminpage" element={<UsersAdminpage />} />
        <Route path="coursesadminpage" element={<CourseAdminPage />} />
        <Route path="contactadminpage" element={<ContactAdminPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </DashboardWrapper>
  );
};

export default AdminPage;
