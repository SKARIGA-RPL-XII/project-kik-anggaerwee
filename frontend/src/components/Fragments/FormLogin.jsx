import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import Checkbox from "../Elements/Checkbox";
import { Login } from "../services/auth.services";
const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    Login(data);
  };

  const showPassword = () => {
    const passwordInput = document.querySelector('input[name="password"]');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      document.getElementById("togglePassword").innerText = "Hide Password";
    } else {
      passwordInput.type = "password";
      document.getElementById("togglePassword").innerText = "Show Password";
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
        <button
          type="button"
          id="togglePassword"
          className="cursor-pointer"
          onClick={() => showPassword()}
        >
          Show Password
        </button>
        <a href="" className="font-semibold text-blue-500">
          Forgot Password?
        </a>
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default FormLogin;
