// types.ts
export enum Status {
  Pending = "pending",
  Incomplete = "incomplete",
  Completed = "completed",
}

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export type SignUpFormData = {
  username: string
  email: string
  password: string
}
export type SignInFormData = Omit<SignUpFormData, "username">

export type TaskType = {
  _id: string
  createdAt: string
  deadline: string
  description: string
  name: string
  priority: Priority
  status: Status
  updatedAt: string
  userId: string
}
