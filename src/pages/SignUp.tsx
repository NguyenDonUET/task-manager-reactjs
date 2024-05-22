import { Toaster } from "react-hot-toast"
import AuthLayout from "../components/auth/AuthLayout"
import SignupForm from "../components/auth/SignupForm"

export default function SignUp() {
  return (
    <AuthLayout title='Tạo tài khoản'>
      <SignupForm />
      <Toaster />
    </AuthLayout>
  )
}
