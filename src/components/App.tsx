import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { setUserInfo, userLogout } from "../redux/user/userSlice"
import router from "../router"
import { LOCAL_ACCESS_TOKEN_KEY } from "../utils/constants"
import getUserInfoFromToken from "../utils/getUserInfoFromToken"
import isTokenExpired from "../utils/isTokenExpired"
import Loading from "./Loading"
import { axiosInstance } from "../api/customAxios"

export const checkTokenAndRefresh = async (token: string) => {
  try {
    const isExpired = isTokenExpired(token)
    console.log("isExpired", isExpired)
    if (!isExpired) {
      return
    }
    const { data } = await axiosInstance.get("/auth/refresh-token")
    const newAccessToken = data.accessToken
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, newAccessToken)
  } catch (error) {
    // refresh token hết hạn
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
    console.log("🚀 ~ refreshToken ~ error:", error)
  }

  return
}
export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
    if (!token) {
      dispatch(userLogout())
      setLoading(false)
      return
    }
    checkTokenAndRefresh(token)

    const newAccessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
    const user = getUserInfoFromToken(newAccessToken!)
    if (user) {
      dispatch(setUserInfo(user))
    }

    setLoading(false)
  }, [dispatch])

  return loading ? (
    <Loading />
  ) : (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
