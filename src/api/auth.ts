import axios from 'axios'
import { UserData } from '../general-types'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export const registration = async ({ userData }: { userData: UserData }) => {
  const res = await axiosInstance.post(`registration`, userData)
  return res.data
}
export const login = async ({ userData }: { userData: UserData }) => {
  const res = await axiosInstance.post(`login`, userData)
  return res.data
}

export const deleteUser = ({ userId }: { userId: string }) => {
  const res = axiosInstance.delete(`user/${userId}`)
  return res
}
