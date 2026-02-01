import "../styles/Logo.css";
import Logo from "../assets/trinslitin-logo.png";
function NavAuth() {
  return (
    <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
      <img className="w-6 h-6" src={Logo} alt="Trinslitin Logo" />
      <h1 className="font-bold text-2xl text-blue-500">Trinslitin</h1>
    </div>
  );
}

export default NavAuth;
