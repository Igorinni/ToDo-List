import axios from 'axios';

const axiosGetTasks = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASKS,
})

const axiosActionOnTask = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASK,
})

export const getArrayTasks = (valueToFilter, valueToSort, taskLimitPerPage, currentPage,) => {
    return axiosGetTasks.get(process.env.REACT_APP_USER_ID, {
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
    return axiosActionOnTask.post(process.env.REACT_APP_USER_ID, newTask);
}

export const removeTask = (id) => {
    return axiosActionOnTask.delete(process.env.REACT_APP_USER_ID_SLASH + id);
}

export const saveStateTask = (task) => {
    return axiosActionOnTask.patch(process.env.REACT_APP_USER_ID_SLASH + task.uuid, {
        name: task.name,
        done: !task.done,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
     });
}

export const saveСhangedTitleTask = (newTitleTask, task) => {
    return axiosActionOnTask.patch(process.env.REACT_APP_USER_ID_SLASH + task.uuid, {
      name: newTitleTask,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    });
}