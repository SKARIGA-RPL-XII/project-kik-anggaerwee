import { use, useEffect } from "react";
import NavbarLayout from "../../components/Layouts/NavbarLayouts";
import { useLogin } from "../../components/hooks/useLogin";
import { getRole } from "../../components/services/auth.services";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  useLogin("1");
  return <NavbarLayout />;
};

export default Dashboard;
