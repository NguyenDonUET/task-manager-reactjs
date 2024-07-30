import axios from 'axios'
import { UserType } from '../redux/user/userSlice'
import { SignInFormData, SignUpFormData } from '../types'
import { BACKEND_URL, LOCAL_ACCESS_TOKEN_KEY } from '../utils/constants'
import { axiosInstance } from './customAxios'

export const refreshToken = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/auth/refresh-token`, {
      withCredentials: true,
    })
    const newAccessToken = data.accessToken
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, newAccessToken)
  } catch (error) {
    // refresh token hết hạn
    console.log('🚀 ~ refreshToken ~ error:', error)
  }
}

export const getUser = async () => {
  const { data } = await axiosInstance.get<{ user: UserType }>(`/users/account`)
  return data
}

export const signUp = async (formData: SignUpFormData) => {
  const { data } = await axios.post(`${BACKEND_URL}/auth/register`, formData)
  return data
}

export const signIn = async (formData: SignInFormData) => {
  const { data } = await axios.post(`${BACKEND_URL}/auth/login`, formData, {
    withCredentials: true,
  })
  return data
}

export const handleLogout = async () => {
  // TH1: local storage
  localStorage.removeItem('userInfo')
  localStorage.removeItem('accessToken')
  // TH2: cookie
  return await axiosInstance.delete(`${BACKEND_URL}/v1/users/logout`)
}

export const refreshToken = async () => {
  return axiosInstance.get(`${BACKEND_URL}/v1/users/refresh_token`)
}
