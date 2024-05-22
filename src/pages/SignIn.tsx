import { Toaster } from "react-hot-toast"
import AuthLayout from "../components/auth/AuthLayout"
import SignInForm from "../components/auth/SignInForm"
import { useAppSelector } from "../redux/hooks"
import { Navigate } from "react-router-dom"

export default function SignIn() {
  const { user } = useAppSelector((state) => state.user)

  return user ? (
    <Navigate to={"/"} />
  ) : (
    <AuthLayout title='Đăng nhập'>
      <SignInForm />
      <Toaster />
    </AuthLayout>
  )
}
