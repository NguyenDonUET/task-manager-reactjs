import { TaskType } from "../types"
import { axiosInstance } from "./customAxios"

type GetTasksResponseType = {
  currentPage: number
  tasks: TaskType[]
  totalItems: number
  totalPages: number
}

export const getTasks = async (): Promise<GetTasksResponseType> => {
  const { data } = await axiosInstance.get<GetTasksResponseType>("/tasks")
  return data
}

export const addTask = async (task: TaskType): Promise<TaskType> => {
  const { data } = await axiosInstance.post("/tasks", task)
  return data
}

export const updateTask = async (
  taskId: string,
  updatedTask: TaskType
): Promise<TaskType> => {
  const { data } = await axiosInstance.patch(`/tasks/${taskId}`, updatedTask)
  return data
}

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`)
}
