import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { editUser, insertUser, formUsers } from "../../../components/services/msuser.services";
import { requestFormReset } from "react-dom";
const FormUser = ({ type = "add", userid }) => {
  const [usernm, setUsernm] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  useEffect(() => {
    if (type === "edit" && userid){
    const fetchUser = async () => {
      try{
        const data = await formUsers(userid);
        if(data){
          setUsernm(data.usernm)
          setEmail(data.email)
          setPassword(data.password)
          setRole(data.role)
        }
      }catch(error){
        console.error("fetch error: ", error)
      }
    };
    fetchUser();
    }
  }, [type, userid])
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    const decoded = jwtDecode(token)

    const data = {
      userid: userid,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      role: event.target.role.value,
      created: decoded.usernm
    }

    if(type === "edit"){
      editUser(data)
    }else{
      insertUser(data)
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
        
        <div className="col-span-2">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={usernm}
            onChange={(e) => setUsernm(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base w-full px-3 py-2.5"
            placeholder="Enter Username"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base w-full px-3 py-2.5"
            placeholder="Enter Email"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base w-full px-3 py-2.5"
            placeholder="Enter Password"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Role
          </label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-sm rounded-base"
          >
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4 border-t pt-4 md:pt-6">
        <button
          type="submit"
          className="inline-flex items-center text-green-400 border border-green-500 hover:bg-green-400 hover:text-black px-4 py-2.5 text-sm"
        >
          <i className="fa-solid fa-circle-check me-2"></i>
          {type === "edit" ? "Update Changes" : "Save Changes"}
        </button>

        <button
          className="inline-flex items-center text-red-400 border border-red-500 hover:bg-red-400 hover:text-black px-4 py-2.5 text-sm"
        >
          <i className="fa-solid fa-arrows-rotate me-2"></i>
          Reset
        </button>
      </div>
    </form>
  );
};

export default FormUser;
