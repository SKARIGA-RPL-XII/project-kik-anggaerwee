import { useRouteError } from "react-router-dom";
import NavAuth from "../components/NavAuth";
import Notfound from "../assets/404notfound.png";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="">
        <NavAuth />
    <div className="grid-cols-12 items-center p-10 gap-6 md:grid min-h-screen">
      <div className="col-span-6">
        <div className="items-center text-center">
            <img src={Notfound} alt="Not Found Image" className="w-100 m-30" />
        </div>
      </div>
      <div className="col-span-6">
        <div className="items-center text-center">
          <h1 className="text-blue-500 text-5xl font-bold mb-2">Oops!</h1>
          <h1 className="text-black text-xl font-semibold">404 - Not Found</h1>
          <p className="mb-3 text-center mx-8">
            the Page are you looking for might have been removeed had his name
            changed or is temporalily unvailable
          </p>
          <button className="py-1 px-5 bg-blue-500 rounded-md text-white cursor-pointer hover:bg-blue-600" onClick={() => window.history.back()}>Back to before</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ErrorPage;
