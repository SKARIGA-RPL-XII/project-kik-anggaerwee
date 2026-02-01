import { useEffect, useState } from "react"
import { GetUser, UpdateProfile } from "../../../components/services/user.services"
import { jwtDecode } from "jwt-decode"

const FormUser = () => {
    const [email, setEmail] = useState(null)
    const [usernm, setUsernm] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {
            const data = await GetUser()
            setEmail(data.data.email)
            setUsernm(data.data.usernm)
        }

        fetchUser()
    }, [])

    const handleEditUser = (event) => {
        event.preventDefault();
        const decoded = jwtDecode(localStorage.getItem("token"))
        const data = {
            usernm: event.target.usernm.value,
            email: event.target.email.value,
            userid: decoded.userid
        }
        UpdateProfile(data)
    }

    return(
<form onSubmit={handleEditUser}>
  
  <div className="flex flex-row mb-4">
    <label className="w-32">Email</label>
    <input
      type="email"
      name="email"
      className="w-full rounded-md border border-slate-500 py-2 px-3"
      placeholder="Enter Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="flex flex-row mb-4">
    <label className="w-32">Username</label>
    <input
      type="text"
      name="usernm"
      className="w-full rounded-md border border-slate-500 py-2 px-3"
      placeholder="Enter Your Username"
      value={usernm}
      onChange={(e) => setUsernm(e.target.value)}
    />
  </div>

  <div className="flex gap-3">
    <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 cursor-pointer rounded-md text-white px-4 py-2"
        >
          Save Change
        </button>
        <button
          type="reset"
          className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-md text-white px-4 py-2"
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
  </div>

</form>

    )
}

export default FormUser