import axios from "axios";
import { User } from "../task-user.types"

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const registration = async (candidate: User) => {
  const res = await axiosInstance.post(`registration`, candidate);
  return res.data;
};
export const login = async (candidate: User) => {
  const res = await axiosInstance.post(`login`, candidate);
  return res.data;
};

export const deleteUser = (id: string) => axiosInstance.delete(`user/${id}`);
