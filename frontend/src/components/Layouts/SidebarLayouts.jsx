import { Link } from "react-router-dom";
import Logo from "../../assets/trinslitin-logo.png";
import Vector from "../../assets/vector.png";
import { Logout } from "../services/auth.services";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import {
  Grid,
  Users,
  CreditCard,
  Globe,
  User,
  LogOut,
  ChevronsRight,
  ChevronsLeft
} from "react-feather";

const SidebarLayouts = (props) => {
  const { children, type } = props;
  const token = localStorage.getItem("token");
  useLogin();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="min-h-screen flex">
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen bg-linear-to-t from-sky-50 to-blue-50 px-4 py-3 shadow-md border-e border-slate-300 overflow-y-auto transition-all duration-300 
          ${isExpanded ? 'w-64' : 'w-20'}`}
      >
        <div className={`flex items-center gap-2 pb-3 mb-5 border-b border-blue-600 ${!isExpanded && 'justify-center'}`}>
          <img src={Logo} alt="Logo" className="w-10 h-10 min-w-[40px]" />
          {isExpanded && <span className="text-blue-500 font-bold text-xl truncate">Trinslitin.</span>}
        </div>

        <nav>
          <ul className="space-y-2">
            {[
              { to: "/admin/dashboard", icon: <Grid size={16} />, label: "Dashboard", id: "dashboard" },
              { to: "/admin/table/user", icon: <Users size={16} />, label: "Users", id: "user" },
              { to: "/admin/table/history", icon: <CreditCard size={16} />, label: "History", id: "history" },
              { to: "/admin/table/language", icon: <Globe size={16} />, label: "Language", id: "language" },
              { to: "/admin/profile", icon: <User size={16} />, label: "Profile", id: "profile" },
            ].map((item) => (
              <li key={item.id}>
                <Link 
                  to={item.to}
                  title={!isExpanded ? item.label : ""} 
                  className={`rounded-md px-3 py-2 flex items-center gap-3 transition-colors hover:bg-blue-200 hover:text-blue-600 ${
                    type === item.id 
                      ? "bg-blue-200 text-blue-600 font-semibold" 
                      : "text-gray-600 bg-blue-50"
                  } ${!isExpanded && 'justify-center'}`}
                >
                  <span className="min-w-[20px]">{item.icon}</span>
                  {isExpanded && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            ))}

            <li className="pt-4 border-t">
              <button
                onClick={Logout}
                className={`flex w-full rounded-md px-3 py-2 gap-3 text-red-600 hover:bg-red-100 transition cursor-pointer ${!isExpanded && 'justify-center'}`}
              >
                <LogOut size={20} />
                {isExpanded && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>

        {isExpanded && <img src={Vector} alt="Vector" className="mt-60" />}
      </aside>

      <main 
        className={`min-h-screen w-full transition-all duration-300 ${isExpanded ? 'md:ml-64' : 'ml-20'}`}
      >
        <div className="sticky top-0 bg-blue-100 p-2 z-30 flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full border bg-white border-blue-400 text-blue-400 hover:bg-blue-50 transition shadow-sm cursor-pointer"
          >
            {isExpanded ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
          </button>
        </div>

          {children}
      </main>
    </div>
  );
};

export default SidebarLayouts;
