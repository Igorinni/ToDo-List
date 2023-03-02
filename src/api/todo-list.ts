import axios from 'axios'
import { ActuallyTask, CreateTask } from '../general-types'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

export const getArrayTasks = async ({
  filteringBy,
  sortingBy,
  taskLimitPerPage,
  currentPage,
}: {
  filteringBy: string
  sortingBy: string
  taskLimitPerPage: number
  currentPage: number
}) => {
  const response = await axiosInstance.get(`tasks`, {
    params: {
      filterBy: filteringBy,
      order: sortingBy,
      pp: taskLimitPerPage,
      page: currentPage,
    },
  })
  return response.data
}

export const createTask = ({ newTask }: { newTask: CreateTask }) =>
  axiosInstance.post(`task`, newTask)

export const removeTask = ({ id }: { id: string }) =>
  axiosInstance.delete(`task/${id}`)

export const saveStateTask = ({task}: { task: ActuallyTask }) =>
  axiosInstance.patch(`task/${task.uuid}`, {
    name: task.name,
    done: !task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  })

export const saveChangedTitleTask = ({newValue, task}: { newValue: string; task: ActuallyTask }) =>
  axiosInstance.patch(`task/${task.uuid}`, {
    name: newValue,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  })
