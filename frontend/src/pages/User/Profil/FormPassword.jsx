import { jwtDecode } from "jwt-decode";
import { GetUser, UpdatePassword } from "../../../components/services/user.services";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const FormPassword = () => {
    const token =localStorage.getItem("token")
    const response = jwtDecode(token)

    const handlePassword = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        
        const data = {
            userid: decoded.userid,
            new_password: event.target.password.value,
            current_password: event.target.current_password.value,
            confirm_password: event.target.confirm_password.value,
        }
        UpdatePassword(data)
        console.log("data password",data)
    }
  return (
    <form onSubmit={handlePassword}>
      <div className="flex flex-row mb-4 gap-3">
        <label htmlFor="Email" className="w-32">Current Password</label>
        <input
          type="text"
          name="current_password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Enter Current Password"
        />
      </div>
      <div className="flex flex-row mb-4 gap-3">
        <label htmlFor="Email" className="w-32">New Password</label>
        <input
          type="text"
          name="password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Enter New Password"
        />
      </div>
      <div className="flex flex-row mb-4 gap-3">
        <label htmlFor="Email" className="w-32">Confirm Password</label>
        <input
          type="text"
          name="confirm_password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Confirm New Password"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="bg-green-500 hover:bg-green-600 cursor-pointer rounded-md text-white px-4 py-2">
          Save Change
        </button>
        <button type="reset" className="bg-slate-400 hover:bg-slate-500 cursor-pointer rounded-md text-white px-4 py-2">
          Refresh
        </button>
      </div>
    </form>
  );
};
export default FormPassword;
