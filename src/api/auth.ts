import axios from 'axios'
import { UserType } from '../redux/user/userSlice'
import { SignInFormData, SignUpFormData } from '../types'
import { BACKEND_URL } from '../utils/constants'
import { axiosInstance } from './customAxios'

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
