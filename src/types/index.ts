// types.ts

export type SignUpFormData = {
  name: string
  email: string
  password: string
}
export type SignInFormData = Omit<SignUpFormData, "name">
