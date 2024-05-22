// types.ts

export type SignUpFormData = {
  username: string
  email: string
  password: string
}
export type SignInFormData = Omit<SignUpFormData, "username">
