import axios from "axios"
import { BACKEND_URL, LOCAL_ACCESS_TOKEN_KEY, SIGN_IN_PATH } from "../utils/constants"
import { refreshToken } from "./auth"

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
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error
    const status = response?.status

    if (status === 401) {
      await refreshToken()
      console.log("refreshToken done")

      const newAccessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`
      return axiosInstance(config)
    }
    if (status === 403) {
      localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
      window.location.href = SIGN_IN_PATH
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)
