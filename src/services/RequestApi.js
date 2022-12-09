import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getArrayTasks = async ({
  filteringBy,
  sortingBy,
  taskLimitPerPage,
  currentPage,
}) => {
  const response = await axiosInstance.get(
    `tasks/${process.env.REACT_APP_USER_ID}`,
    {
      params: {
        filterBy: filteringBy,
        order: sortingBy,
        pp: taskLimitPerPage,
        page: currentPage,
      },
    }
  );
  return response.data;
};

export const createTask = (newTask) =>
  axiosInstance.post(`task/${process.env.REACT_APP_USER_ID}`, newTask);

export const removeTask = (id) =>
  axiosInstance.delete(`task/${process.env.REACT_APP_USER_ID}/${id}`);

export const saveStateTask = (task) =>
  axiosInstance.patch(`task/${process.env.REACT_APP_USER_ID}/${task.uuid}`, {
    name: task.name,
    done: !task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });

export const saveСhangedTitleTask = (newTitleTask, task) =>
  axiosInstance.patch(`task/${process.env.REACT_APP_USER_ID}/${task.uuid}`, {
    name: newTitleTask,
    done: task.done,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  });
