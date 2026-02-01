import InputForm from "../Elements/Input"
import Button from "../Elements/Button"
import Checkbox from "../Elements/Checkbox"
import { Register } from "../services/auth.services";
import { useEffect, useRef } from "react";
const FormRegister = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
    }
    Register(data)
  }

    return(
        <form onSubmit={handleRegister}>
            <InputForm
            title="Username"
            name="username"
            type="text"
            placeholder="e.g. Angga Rizki"
          />
            <InputForm
            title="Email"
            name="email"
            type="email"
            placeholder="e.g. angga@gmail.com"
          />
          <InputForm
            title="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="flex justify-between items-center mt-4 text-sm">
            <Checkbox text="Remember Me" />
            
          </div>

          <Button type="submit">Register</Button>
        </form>
    )
}

export default FormRegister;