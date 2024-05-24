import axios from "axios"
import { BACKEND_URL, LOCAL_ACCESS_TOKEN_KEY } from "../utils/constants"
import { axiosInstance } from "./customAxios"
import { UserType } from "../redux/user/userSlice"

export const refreshToken = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/auth/refresh-token`, {
      withCredentials: true,
    })
    const newAccessToken = data.accessToken
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, newAccessToken)
  } catch (error) {
    // refresh token hết hạn
    console.log("🚀 ~ refreshToken ~ error:", error)
  }
}
export const getUser = async () => {
  const { data } = await axiosInstance.get<{ user: UserType }>(`/users/account`)
  return data
}
