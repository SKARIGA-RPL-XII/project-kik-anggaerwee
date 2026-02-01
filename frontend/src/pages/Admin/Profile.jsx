import SidebarLayouts from "../../components/Layouts/SidebarLayouts";
import Breadcrumb from "../../components/Fragments/Breadcrumb";
import { useState, useEffect } from "react";
import FormUser from "./Profil/FormUser";
import FormPassword from "./Profil/FormPassword";
import { GetUser } from "../../components/services/user.services";
const ProfileAdmin = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [subtype, setSubtype] = useState("Edit Profile")
  const [updated, setUpdated] = useState(null)

  useEffect(() => {
        const fetchUser = async () => {
          const data = await GetUser()
          setUpdated(data.data.updateddate)
        }
      
        fetchUser()
      }, [])

  return (
    <SidebarLayouts type="profile">
  <div className="p-4">
    <Breadcrumb type="Profile" subtype={subtype} />
  </div>

  

  <div className="grid grid-cols-1 md:grid-cols-12 mx-5 gap-5">

<div className="md:col-span-2">
      <div className="rounded-md bg-slate-100">
        <ul className="text-center">
          <li
            onClick={() => {
              setActiveTab("user");
              setSubtype("Edit Profile");
            }}
            className={`p-3 cursor-pointer rounded-t-lg ${
              activeTab === "user" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Profile
          </li>

          <li
            onClick={() => {
              setActiveTab("password");
              setSubtype("Change Password");
            }}
            className={`p-3 cursor-pointer rounded-b-lg ${
              activeTab === "password" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Password
          </li>
        </ul>
      </div>
    </div>

    <div className="md:col-span-10">
      <div className="p-4 md:p-6 rounded-md border-2 shadow-md border-slate-300">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Profile</h1>
         <p className="text-sm text-slate-500 hidden md:block">
          The last update was on {updated}
        </p>
        </div>
        <hr className="my-3" />
        {activeTab === "user" && <FormUser />}
        {activeTab === "password" && <FormPassword />}
        <p className="text-sm mt-3 text-slate-500 block md:hidden">
          The last update was on {updated}
        </p>
      </div>
    </div>

    

  </div>
</SidebarLayouts>

  );
};

export default ProfileAdmin;
