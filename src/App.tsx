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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  //MAY 21 - 1:49AM
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
      {shouldRenderHeader && <Header />}
      {shouldRenderSidebar && <Sidebar />}
      <Routes>
        <Route
          path={"/"}
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path={"/dashboard"}
          element={user ? <DashboardPage /> : <Navigate to="/no-access" />}
        />
        <Route
          path={"/courses"}
          element={user ? <CoursePage /> : <Navigate to="/no-access" />}
        />
        <Route
          path={"/students"}
          element={user ? <StudentPage /> : <Navigate to="/no-access" />}
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
