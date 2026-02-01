import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../services/auth.services";

export const useGuestGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const role = getRole(token);
    if (!role) {
      localStorage.removeItem("token");
      return;
    }

    if (role === "1") {
      navigate("/user/dashboard", { replace: true });
    } else if (role === "2") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);
};
