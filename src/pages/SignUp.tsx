import { Navigate } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"
import SignupForm from "../components/auth/SignupForm"
import { useAppSelector } from "../redux/hooks"

export default function SignUp() {
  const { user } = useAppSelector((state) => state.user)

  return user ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayout title='Tạo tài khoản'>
      <SignupForm />
    </AuthLayout>
  )
}
