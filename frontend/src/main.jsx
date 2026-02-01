import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ErrorPage from "./pages/404.jsx";
import UserDashboard from "./pages/User/Dashboard.jsx";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import ProfileUser from "./pages/User/Profile.jsx";
import Loading from "./pages/Loading.jsx";
import ProfileAdmin from "./pages/Admin/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/user/profile",
    element: <ProfileUser />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/profile",
    element: <ProfileAdmin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>,
);
