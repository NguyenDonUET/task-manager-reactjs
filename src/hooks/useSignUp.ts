import { useMutation } from "@tanstack/react-query"
import { SignInFormData, SignUpFormData } from "../types"
import { BACKEND_URL } from "../utils/constants"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

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

export const useSignUp = async () => {
  return useMutation({
    mutationFn: (formData: SignUpFormData) => signUp(formData),
    onSuccess: (data) => {
      toast.success(data.msg)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error)
        const errorRes = error.response?.data
        toast.error(errorRes.msg)
      }
    },
  })
}
