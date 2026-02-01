import AuthLayout from "../components/Layouts/AuthLayouts"
import FormLogin from "../components/Fragments/FormLogin"
import { useGuestGuard } from "../components/hooks/useGuestGuard"
// import { Link } from "react-router-dom"
const LoginPage = () => {
    useGuestGuard();
    return(
        <AuthLayout title="Login" type="login">
            <FormLogin />
        </AuthLayout>
    )
}

export default LoginPage