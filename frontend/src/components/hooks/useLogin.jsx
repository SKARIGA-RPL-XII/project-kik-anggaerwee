import { use, useEffect, useState } from "react";
import { getRole } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const useLogin = (allowedRole) => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      localStorage.removeItem("token");
      window.location.replace("/");
      return;
    }

    const decodedRole = getRole(token)

    if(!decodedRole){
      localStorage.removeItem("token");
      window.location.replace("/");
      return;
    }

    if(allowedRole && decodedRole !== allowedRole){
      if (decodedRole === "1"){
        navigate("/user/dashboard", {replace: true} );
      }else if(decodedRole === "2"){
        navigate("/admin/dashboard", {replace: true} );
      }else{
        localStorage.removeItem("token");
        window.location.replace("/");
      }
      return;
    }

    setRole(decodedRole);
  }, [allowedRole]);

  return role;
};
