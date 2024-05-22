import { Toaster } from "react-hot-toast"
import AuthLayout from "../components/auth/AuthLayout"
import SignInForm from "../components/auth/SignInForm"

export default function SignIn() {
  return (
    <AuthLayout title='Đăng nhập'>
      <SignInForm />
      <Toaster />
    </AuthLayout>
  )
}
