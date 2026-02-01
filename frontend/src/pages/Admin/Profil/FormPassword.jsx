import { jwtDecode } from "jwt-decode";
import { UpdatePassword } from "../../../components/services/user.services";

const FormPassword = () => {
  const handlePassword = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const data = {
      userid: decoded.userid,
      new_password: event.target.password.value,
      current_password: event.target.current_password.value,
      confirm_password: event.target.confirm_password.value,
    };
    UpdatePassword(data);
  };
  return (
    <form onSubmit={handlePassword}>
      <div className="flex flex-row mb-4">
        <label htmlFor="Password" className="w-32">
          Current Password
        </label>
        <input
          type="text"
          name="current_password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Enter Current Password"
        />
      </div>
      <div className="flex flex-row mb-4">
        <label htmlFor="Password" className="w-32">
          New Password
        </label>
        <input
          type="text"
          name="password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Enter New Password"
        />
      </div>
      <div className="flex flex-row mb-4">
        <label htmlFor="Password" className="w-32">
          Confirm Password
        </label>
        <input
          type="text"
          name="confirm_password"
          className="w-full rounded-md border border-slate-500 py-2 px-3"
          placeholder="Enter Confirm Password"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
        >
          Save Change
        </button>
        <button
          type="reset"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </form>
  );
};

export default FormPassword;
