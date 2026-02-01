import { Link } from "react-router-dom";
import Logo from "../../assets/trinslitin-logo.png";
import { Logout } from "../services/auth.services";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const SidebarLayouts = (props) => {
  const {children, type} = props;
  const token = localStorage.getItem("token")
  useLogin()
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <aside className="col-span-12 md:col-span-2 bg-blue-50 px-4 py-6 shadow-md">
        <div className="flex items-center gap-2 mb-8">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <span className="text-blue-500 font-bold text-xl">Trinslitin.</span>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className={`block rounded-md px-3 py-2 hover:bg-blue-200 hover:text-blue-600 transition ${type == "dashboard" ? " bg-blue-200 text-blue-600 font-semibold" : "text-gray-600 bg-blue-50"}`}>
                Dashboard
              </Link>
            </li>

            <li>
              <a href="" className="block rounded-md px-3 py-2 text-gray-700 hover:bg-blue-200 hover:text-blue-600 transition">
                Data User
              </a>
            </li>

            <li>
              <a href="" className="block rounded-md px-3 py-2 text-gray-700 hover:bg-blue-200 hover:text-blue-600 transition">
                Data Riwayat
              </a>
            </li>

            <li>
              <a href="" className="block rounded-md px-3 py-2 text-gray-700 hover:bg-blue-200 hover:text-blue-600 transition">
                Data Language
              </a>
            </li>

            <li>
              <Link to="/admin/profile" className={`block rounded-md px-3 py-2 hover:bg-blue-200 hover:text-blue-600 transition ${type == "profile" ? "bg-blue-200 text-blue-600 font-semibold" : "text-gray-600 bg-blue-50"}`}>
                Profile
              </Link>
            </li>

            <li className="pt-4 border-t">
              <a type="button" onClick={() => Logout()} className="block rounded-md px-3 py-2 text-red-600 hover:bg-red-100 transition cursor-pointer">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="col-span-12 md:col-span-10">
        <div className="top-0 bg-blue-100 p-2">
          <button className="px-2 py-1 rounded-md border">
            <i className="fa-solid fa-bars" ></i>
          </button>
          </div>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayouts;
