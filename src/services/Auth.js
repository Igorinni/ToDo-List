import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const registration = ({ username, password }) =>
  axiosInstance.post(`registration`, { username, password });

export const login = ({ username, password }) =>
  axiosInstance.post(`login`, { username, password });

export const deleteUser = (id) =>
  axiosInstance.delete(`user/${id}`);

export const allUsers = async () => {
  const users = await axiosInstance.get(`users`, );
  return users.data;
}