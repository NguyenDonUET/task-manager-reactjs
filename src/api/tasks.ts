import { TaskType } from "../types"
import { axiosInstance } from "./customAxios"

type GetTasksResponseType = {
  currentPage: number
  tasks: TaskType[]
  totalItems: number
  totalPages: number
}
const DEFAULT_PAGE_SIZE = 6

export const getTasks = async (page: number): Promise<GetTasksResponseType> => {
  const { data } = await axiosInstance.get<GetTasksResponseType>(
    `/tasks?page=${page}&limit=${DEFAULT_PAGE_SIZE}`
  )
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
