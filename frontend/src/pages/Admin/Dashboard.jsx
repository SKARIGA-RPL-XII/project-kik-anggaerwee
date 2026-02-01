import { useLogin } from "../../components/hooks/useLogin";
import SidebarLayouts from "../../components/Layouts/SidebarLayouts";
import { jwtDecode } from "jwt-decode";
import { getRole } from "../../components/services/auth.services";
import ProfileAdmin from "./Profile";
import Breadcrumb from "../../components/Fragments/Breadcrumb";
const Dashboard = () => {
  const token = localStorage.getItem("token");
  useLogin("2");
  return (
      <SidebarLayouts type="dashboard">
        <div className="p-4">
          <Breadcrumb type="Dashboard" />
        </div>
      </SidebarLayouts>
  );
};

export default Dashboard;
