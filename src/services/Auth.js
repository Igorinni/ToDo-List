import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const registration = async (candidate) =>{
  const res = await axiosInstance.post(`registration`, candidate);
  return res.data;
}
export const login = async (candidate) =>{
  const res = await axiosInstance.post(`login`, candidate);
  return res.data;
}

export const deleteUser = (id) =>
  axiosInstance.delete(`user/${id}`);

export const allUsers = async () => {
  const users = await axiosInstance.get(`users`, );
  return users.data;
}