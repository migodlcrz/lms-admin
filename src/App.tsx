import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import { useAuthContext } from "./hooks/useAuthContext";
import NotLoggedIn from "./components/NotLoggedIn";
import Sidebar from "./components/Sidebar";
import StudentPage from "./pages/StudentPage";
import CoursePage from "./pages/CoursePage";
import SettingsPage from "./pages/SettingsPage";
import "react-responsive-modal/styles.css";
import { ToastContainer } from "react-toastify";
import StudentDetail from "./components/StudentDetail";
import CourseDetails from "./components/CourseDetails";
import PricingPage from "./pages/PricingPage";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderOnPages = [
    "/dashboard",
    "/students",
    "/courses",
    "/settings",
    "/no-access",
  ];
  const hideSidebarOnPages = ["/", "/no-access"];

  const shouldRenderHeader = !hideHeaderOnPages.includes(location.pathname);
  const shouldRenderSidebar = !hideSidebarOnPages.includes(location.pathname);

  const { user } = useAuthContext();

  return (
    <div>
      <ToastContainer />
      {/* {shouldRenderHeader && <Header />} */}
      {/* {shouldRenderSidebar && <Sidebar />} */}
      <Routes>
        <Route
          path={"/"}
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path={"/dashboard"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <DashboardPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path={"/courses"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col w-full">
                  <CoursePage />
                </div>
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path={"/courses/:courseId"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <CourseDetails />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path={"/students"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <StudentPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path={"/pricing"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <PricingPage />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path={"/students/:studentId"}
          element={
            user ? (
              <div className="flex flex-row">
                <Sidebar />
                <StudentDetail />
              </div>
            ) : (
              <Navigate to="/no-access" />
            )
          }
        />
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/no-access" />}
        />
        <Route path="/no-access" element={<NotLoggedIn />} />
      </Routes>
    </div>
  );
}

export default App;
