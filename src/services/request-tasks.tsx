import axios from 'axios'
import { newTask, TaskObj } from '../task-user.types'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

interface getTasksArguments {
  filteringBy: string
  sortingBy: string
  taskLimitPerPage: number
  currentPage: number
}

type ResponseGet = {
  config: object
  data: object
  headers: any
  request: any
  status: number
  statusText: string
}

export const getArrayTasks = async ({
  filteringBy,
  sortingBy,
  taskLimitPerPage,
  currentPage,
}: getTasksArguments): Promise<{ data: object }> => {
  const response = await axiosInstance.get<ResponseGet>(`tasks`, {
    params: {
      filterBy: filteringBy,
      order: sortingBy,
      pp: taskLimitPerPage,
      page: currentPage,
    },
  })
  return response.data
}

export const createTask = (newTask: newTask) =>
  axiosInstance.post(`task`, newTask)

export const removeTask = (id: string) => axiosInstance.delete(`task/${id}`)

export const saveStateTask = (task: TaskObj) =>
  axiosInstance.patch(`task/${task.uuid}`, {
    name: task.name,
    done: !task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  })

export const saveChangedTitleTask = (newTitleTask: string, task: TaskObj) =>
  axiosInstance.patch(`task/${task.uuid}`, {
    name: newTitleTask,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  })
