import NavAuth from "../NavAuth";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  return (
    <>
      <NavAuth />
      <div className="flex min-h-screen justify-center items-center">
        <div className="w-full max-w-sm text-start">
          <h1 className="text-3xl font-medium">{title}</h1>
          <p className="mb-1 font-light text-sm text-slate-400 mt-1">
            Hi, Welcome to Trinslitin!
          </p>
          <hr className=" text-slate-400" />

          {children}
          
          <p className="text-sm text-center mt-2 font-semibold">
            {type == "register" ? "Already have an account? " : "Dont have an account? "}
            {type == "register" && (
                <Link to="/" className="text-blue-500">
              Login
            </Link>
            )}
            {type == "login" && (
                <Link to="/register" className="text-blue-500">
              Register
            </Link>
            )}
          </p>

        </div>
      </div>
    </>
  );
};

export default AuthLayout;
