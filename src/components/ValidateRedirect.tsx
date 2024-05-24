import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { LOCAL_ACCESS_TOKEN_KEY } from "../utils/constants"
import { useAppDispatch } from "../redux/hooks"
import getUserInfoFromToken from "../utils/getUserInfoFromToken"
import { setUserInfo } from "../redux/user/userSlice"
import Loading from "./Loading"
import isTokenExpired from "../utils/isTokenExpired"

export default function ValidateRedirect() {
  const [loading, setLoading] = useState(true)

  const [token, setToken] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
    if (token && !isTokenExpired(token)) {
      const user = getUserInfoFromToken(token)!
      dispatch(setUserInfo(user))
      setToken(true)
    }
    setLoading(false)
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  return token ? <Navigate to={"/"} replace /> : <Outlet />
}
