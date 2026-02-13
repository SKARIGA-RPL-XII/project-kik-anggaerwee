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
import TableUser from "./pages/Admin/MasterUser/TableUser.jsx";
import TableLang from "./pages/Admin/MasterLang/TableLang.jsx";
import TableHis from "./pages/Admin/MasterHistory/TableHistory.jsx";
import UserHistory from "./pages/User/History.jsx";

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
    path: "/user/history",
    element: <UserHistory />,
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
  {
    path: "/admin/table/user",
    element: <TableUser />,
  },
  {
    path: "/admin/table/language",
    element: <TableLang />,
  },
  {
    path: "/admin/table/history",
    element: <TableHis />,
  }
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Loading />} />
  </React.StrictMode>,
);
