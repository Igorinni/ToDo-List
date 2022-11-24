import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})


export const getArrayTasks = (valueToFilter, valueToSort, taskLimitPerPage, currentPage,) => {
    return axiosInstance.get(`tasks/${process.env.REACT_APP_USER_ID}`, {
        params: {
            filterBy: valueToFilter,
            order: valueToSort,
            pp: taskLimitPerPage,
            page: currentPage,
        }
    }).then(response => {
        return response.data
    })
    
}

export const createTask = (newTask) => {
    return axiosInstance.post(`task/${process.env.REACT_APP_USER_ID}`, newTask);
}

export const removeTask = (id) => {
    return axiosInstance.delete(`task/${process.env.REACT_APP_USER_ID}/${id}`);
}

export const saveStateTask = (task) => {
    return axiosInstance.patch(`task/${process.env.REACT_APP_USER_ID}/${task.uuid}`, {
        name: task.name,
        done: !task.done,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
     });
}

export const saveСhangedTitleTask = (newTitleTask, task) => {
    return axiosInstance.patch(`task/${process.env.REACT_APP_USER_ID}/${task.uuid}`, {
      name: newTitleTask,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
}