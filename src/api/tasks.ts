import { AxiosResponse } from 'axios'
import { AddTaskFormData, TaskType } from '../types'
import { axiosInstance } from './customAxios'

type BaseResponseType = {
  msg: string
}

export type GetTasksResponseType = {
  currentPage: number
  tasks: TaskType[]
  totalItems: number
  totalPages: number
  numberInCompletedTasks: number
}
const DEFAULT_PAGE_SIZE = 6

export const getTasks = async (
  page: number
): Promise<AxiosResponse<GetTasksResponseType>> => {
  return await axiosInstance.get<GetTasksResponseType>(
    `/tasks?page=${page}&limit=${DEFAULT_PAGE_SIZE}`
  )
}

export const addTask = async (task: AddTaskFormData) => {
  const { data } = await axiosInstance.post<TaskType & BaseResponseType>(
    '/tasks',
    task
  )
  return data
}

export const updateTask = async (
  taskId: string,
  updatedTask: AddTaskFormData
) => {
  const { data } = await axiosInstance.patch(`/tasks/${taskId}`, updatedTask)
  return data
}

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`)
}
