import { Navigate } from "react-router-dom"
import AuthLayout from "../components/auth/AuthLayout"
import SignInForm from "../components/auth/SignInForm"
import { useAppSelector } from "../redux/hooks"

export default function SignIn() {
  const { user } = useAppSelector((state) => state.user)

  return user ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayout title='Đăng nhập'>
      <SignInForm />
    </AuthLayout>
  )
}
