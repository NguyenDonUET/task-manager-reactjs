import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { SIGN_IN_PATH } from "../utils/constants"

function AuthGuard({ children }: PropsWithChildren) {
  const { user } = useAppSelector((state) => state.user)

  // User is logged in, allow access to the protected route
  return user ? children : <Navigate to={SIGN_IN_PATH} />
}

export default AuthGuard
