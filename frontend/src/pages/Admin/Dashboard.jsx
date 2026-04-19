import { useLogin } from "../../components/hooks/useLogin";
import SidebarLayouts from "../../components/Layouts/SidebarLayouts";
import Breadcrumb from "../../components/Fragments/Breadcrumb";
import {
  Users,
  MessageCircle,
  Globe,
  User,
  ArrowUpCircle,
} from "react-feather";
import Languages from "./Charts/Languages";
import Roles from "./Charts/Roles";
import ConLang from "./Charts/ConditionLang";
import { TotalUser, TotalLanguage, TotalHistory } from "../../components/services/dashboard.services";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import RolePie from "./Charts/RolePie";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token)
  const [totaluser, setTotalUser] = useState("")
  const [totallang, setTotalLang] = useState("")
  const [totalhist, setTotalHist] = useState("")
  const [usernm, setUsernm] = useState("")
  const [role, setRole] = useState("")

  useLogin("2");
  useEffect(() => {
    const fetchData = async () => {
        const totaluser = await TotalUser();
        const totalang = await TotalLanguage();
        const totalhis = await TotalHistory();
        setRole(decoded.role)
        setUsernm(decoded.usernm)
        setTotalUser(totaluser.total_users)
        setTotalLang(totalang.total_lang)
        setTotalHist(totalhis.total_history)
    }

    fetchData();
  }, [])
  return (
    <SidebarLayouts type="dashboard">
      <Breadcrumb type="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 mx-5 gap-5">
        <div className="md:col-span-3">
          <div className="bg-white rounded-md border border-slate-300 hover:border-blue-500 hover:shadow-md">
            <div className="p-2 flex justify-between items-center">
              <h1 className="font-extralight text-md">Total Users</h1>
              <Users size={20} />
            </div>
            <div className="my-2 mx-2 flex justify-strect gap-3 items-center">
              <h1 className="font-medium text-4xl">{totaluser}</h1>
              <ArrowUpCircle color="" />
            </div>
            <Link to="/admin/table/user">
            <div className="w-full text-center bg-transparan hover:bg-blue-50/30 py-1 cursor-pointer">
              Visit
            </div>
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="bg-linear-to-r from-white to-blue-100 rounded-md border border-slate-300 hover:border-blue-500 hover:shadow-md">
            <div className="p-2 flex justify-between items-center">
              <h1 className="font-extralight text-md">Total Language</h1>
              <MessageCircle size={20} />
            </div>
            <div className="my-2 mx-2 flex justify-between items-center">
              <h1 className="font-medium text-4xl">{totallang}</h1>
            </div>
            <Link to="/admin/table/language">
            <div className="w-full text-center bg-transparan hover:bg-blue-50/30 py-1 cursor-pointer">
              Visit
            </div>
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="bg-linear-to-r from-blue-100 to-blue-400 rounded-md border border-slate-300 hover:border-blue-500 hover:shadow-md">
            <div className="p-2 flex justify-between items-center">
              <h1 className="font-extralight text-md">History Transaction</h1>
              <Globe size={20} />
            </div>
            <div className="my-2 mx-2 flex justify-between items-center">
              <h1 className="font-medium text-4xl">{totalhist}</h1>
            </div>
            <Link to="/admin/table/history">
            <div className="w-full text-center bg-transparan hover:bg-blue-50/30 py-1 cursor-pointer">
              Visit
            </div>
            </Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="bg-blue-400 rounded-md border border-slate-300 hover:border-blue-500 hover:shadow-md">
            <div className="p-2 flex justify-between items-center">
              <h1 className="font-extralight text-md">{usernm}</h1>
              <User size={20} />
            </div>
            <div className="my-2 mx-2 flex justify-between items-center">
              <h1 className="font-medium text-4xl">{role ? "Admin" : "User"}</h1>
            </div>
            <Link to="/admin/profile">
            <div className="w-full text-center bg-transparan hover:bg-blue-50/30 py-1 cursor-pointer">
              Visit
            </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 mx-5 my-5 gap-5">
        <div className="md:col-span-9">
          <div className="bg-linear-to-r from-blue-100 to-blue-50 rounded-md border border-slate-400 p-3 hover:border-blue-500 hover:shadow-md">
            <h1 className="font-regular mb-2">Language Used in <span className="font-semibold">History Transaction</span></h1>
            <hr />
            <Languages />
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col gap-3">
            <div className="bg-linear-to-r from-blue-50 to-white rounded-md border border-slate-400 p-3 hover:border-blue-500 hover:shadow-md">
                <h1 className="font-regular mb-2">Role Users</h1>
            <hr />
                <Roles />
            </div>
            <div className="bg-linear-to-r from-blue-50 to-white rounded-md border border-slate-400 p-3 hover:border-blue-500 hover:shadow-md">
                <h1 className="font-regular mb-2">Language Isactive</h1>
            <hr />
                <RolePie />
            </div>
        </div>
      </div>
    </SidebarLayouts>
  );
};

export default Dashboard;
