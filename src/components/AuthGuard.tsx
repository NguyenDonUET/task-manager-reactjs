import { useQuery } from "@tanstack/react-query"
import { PropsWithChildren, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { getUser } from "../api/auth"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setUserInfo } from "../redux/user/userSlice"
import { SIGN_IN_PATH } from "../utils/constants"
import Loading from "./Loading"

function AuthGuard({ children }: PropsWithChildren) {
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const { data, isSuccess, isPending } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["account"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  })

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo(data.user))
    }
  }, [dispatch, data?.user, isSuccess])

  if (isPending) {
    return <Loading />
  }

  // User is logged in, allow access to the protected route
  return user ? children : <Navigate to={SIGN_IN_PATH} replace />
}

export default AuthGuard
