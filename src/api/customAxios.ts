import axios from "axios"
import { checkTokenAndRefresh } from "../components/App"
import { BACKEND_URL, LOCAL_ACCESS_TOKEN_KEY } from "../utils/constants"

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ` + token
    return config
  },
  function (error) {
    // Handle request error (if needed)
    return Promise.reject(error)
  }
)

// Interceptor for handling expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error
    const status = response?.status

    // Kiểm tra mã lỗi có phải là 401 hoặc 403 hay không
    if (status === 401 || status === 403) {
      const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)!
      console.log(accessToken)
      checkTokenAndRefresh(accessToken)

      const newAccessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)!

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`
      return axiosInstance(config)
    }
    return Promise.reject(error)
  }
)
