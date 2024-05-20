import AuthLayout from "../components/auth/AuthLayout"
import SignupForm from "../components/auth/SignupForm"

export default function SignUp() {
  return (
    <AuthLayout title='Đăng ký'>
      <SignupForm />
    </AuthLayout>
  )
}
