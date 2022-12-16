import { Text } from '@chakra-ui/react'
import Task from './task.tsx'
import { saveСhangedTitleTask } from '../services/RequestApi.js'
import { TaskObj } from '../task.types'
import React, { FC } from 'react'

interface TaskListProps {
  tasksList: Array<object>,
  deleteTask: (task: TaskObj) => void,
  checkTask: (task: TaskObj) => void,
  getTasks: () => void,
  loadingPage: boolean,
  handleLoadingPage: (condition: boolean) => void,
  setErrorText: any,
  usernameAuth: string,
}

const TaskList: FC<TaskListProps> = ({
  tasksList,
  deleteTask,
  checkTask,
  getTasks,
  loadingPage,
  handleLoadingPage,
  setErrorText,
  usernameAuth,
}) => {
  const saveСhangedTitle = async (value: string, task: TaskObj) => {
    try {
      handleLoadingPage(true)
      await saveСhangedTitleTask(value, task)
      getTasks()
    } catch (error) {
      setErrorText(error.response.data.message)
    } finally {
      handleLoadingPage(false)
    }
  }

  return (
    <>
      {(!usernameAuth || tasksList.length <= 0) && (
        <Text
          m='50'
          color='rgb(56, 27, 102)'
          fontSize='26'
          fontStyle='italic'
          textDecoration='underline'
        >
          The list is empty
        </Text>
      )}

      {usernameAuth &&
        tasksList.map(
          (
            elem: any // any ???????????????????
          ) => (
            <Task
              task={elem}
              key={elem.uuid}
              deleteTask={deleteTask}
              checkTask={checkTask}
              loadingPage={loadingPage}
              saveСhangedTitle={saveСhangedTitle}
            />
          )
        )}
    </>
  )
}

export default TaskList
