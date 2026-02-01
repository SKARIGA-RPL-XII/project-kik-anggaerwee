import AuthLayout from "../components/Layouts/AuthLayouts"
import FormRegister from "../components/Fragments/FormRegister"
import { useGuestGuard } from "../components/hooks/useGuestGuard"
const RegisterPage = () => {
    useGuestGuard();
    return(
        <AuthLayout title="Register" type="register">
            <FormRegister />
        </AuthLayout>
    )
}

export default RegisterPage