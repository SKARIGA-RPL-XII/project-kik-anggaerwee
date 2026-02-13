import NavbarLayouts from "../../components/Layouts/NavbarLayouts";
import FormUser from "./Profil/FormUser";
import FormPassword from "./Profil/FormPassword";
import { GetUser } from "../../components/services/user.services";
import { useState, useEffect } from "react";
const Profile = () => {
    const [activeTab, setActiveTab] = useState("user");
    const [updated, setUpdated] = useState(null)

    useEffect(() => {
      const fetchUser = async () => {
        const data = await GetUser()
        setUpdated(data.data.updateddate)
      }
    
      fetchUser()
    }, [])

  return (
    <div>
  <NavbarLayouts type="profile" />

  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-10">
    
    <div className="md:col-span-3">
      <div className="shadow-md border-2 border-slate-300">
        <ul className="text-center">
          <li
            onClick={() => setActiveTab("user")}
            className={`p-3 cursor-pointer ${
              activeTab === "user" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Profile
          </li>
          <li
            onClick={() => setActiveTab("password")}
            className={`p-3 cursor-pointer ${
              activeTab === "password" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Password
          </li>
        </ul>
      </div>
    </div>

    <div className="md:col-span-9">
      <div className="p-4 md:p-6 rounded-md shadow-md border-2 border-slate-300">
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
</div>
  );
};

export default Profile;
