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
import SignInPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuthContext } from "./hooks/useAuthContext";
import NotLoggedIn from "./components/NotLoggedIn";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderOnPages = ["/dashboard"];
  const hideSidebarOnPages = ["/"];

  const shouldRenderHeader = !hideHeaderOnPages.includes(location.pathname);
  const shouldRenderSidebar = !hideSidebarOnPages.includes(location.pathname);

  const { user } = useAuthContext();

  return (
    <div>
      {shouldRenderHeader && <Header />}
      {shouldRenderSidebar && <Sidebar />}
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route
          path={"/dashboard"}
          element={user ? <DashboardPage /> : <NotLoggedIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
