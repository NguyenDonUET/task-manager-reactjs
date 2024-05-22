import { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { setUserInfo } from "../redux/user/userSlice"
import router from "../router"
import { LOCAL_ACCESS_TOKEN_KEY } from "../utils/constants"
import getUserInfoFromToken from "../utils/getUserInfoFromToken"
import Loading from "./Loading"

export default function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)
    const user = getUserInfoFromToken(token!)
    if (user) {
      dispatch(setUserInfo(user))
    }
    setLoading(false)
  }, [dispatch])

  return loading ? <Loading /> : <RouterProvider router={router} />
}
