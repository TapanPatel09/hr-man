import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AttendanceTracking from 'pages/attendance-tracking';
import SignUpRegistration from 'pages/sign-up-registration';
import EmployeeDashboard from 'pages/employee-dashboard';
import EmployeeProfileManagement from 'pages/employee-profile-management';
import LeaveApplication from 'pages/leave-application';
import AdminHRDashboard from 'pages/admin-hr-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SignUpRegistration />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="/sign-up-registration" element={<SignUpRegistration />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-profile-management" element={<EmployeeProfileManagement />} />
        <Route path="/leave-application" element={<LeaveApplication />} />
        <Route path="/admin-hr-dashboard" element={<AdminHRDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
