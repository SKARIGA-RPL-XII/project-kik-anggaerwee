import { useEffect, useState } from 'react'
import Logo from '../../assets/trinslitin-logo.png'
import { Logout } from '../services/auth.services'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
const NavbarLayouts = () => {
    const [open, setOpen] = useState(false);
    useLogin()
    return (
      <nav className="bg-blue-50 shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-xl text-blue-500 ml-2">
            Trinslitin
          </span>
        </div>

        <div className="hidden md:flex gap-6 items-center font-semibold text-slate-800">
          <a href="/user/dashboard" className="hover:text-blue-600">
            Translate
          </a>
          <a href="/history" className="hover:text-blue-600">
            History
          </a>
          <a href="/user/profile" className="hover:text-blue-600">
            Profile
          </a>
          <button
            onClick={() => Logout()}
            className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-2xl text-blue-500"
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-semibold text-slate-800">
          <a href="/user/dashboard" className="hover:text-blue-600">
            Translate
          </a>
          <a href="/history" className="hover:text-blue-600">
            History
          </a>
          <a href="/user/profile" className="hover:text-blue-600">
            Profile
          </a>
          <button
            onClick={() => Logout()}
            className="py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavbarLayouts