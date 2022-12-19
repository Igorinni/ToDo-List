import { Text } from '@chakra-ui/react'
import Task from './task'
import { saveChangedTitleTask } from '../services/request-tasks'
import { TaskObj } from '../task-user.types'

interface TaskListProps {
  tasksList: Array<object>
  deleteTask: (uuid: string) => void
  checkTask: (task: TaskObj) => void
  getTasks: () => void
  loadingPage: boolean
  handleLoadingPage: (condition: boolean) => void
  setErrorText: any
  usernameAuth: string
}

const TaskList = ({
  tasksList,
  deleteTask,
  checkTask,
  getTasks,
  loadingPage,
  handleLoadingPage,
  setErrorText,
  usernameAuth,
}: TaskListProps) => {
  const saveChangedTitle = async (value: string, task: TaskObj) => {
    try {
      handleLoadingPage(true)
      await saveChangedTitleTask(value, task)
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
        tasksList.map((elem: any) => (
          <Task
            task={elem}
            key={elem.uuid}
            deleteTask={deleteTask}
            checkTask={checkTask}
            loadingPage={loadingPage}
            saveChangedTitle={saveChangedTitle}
          />
        ))}
    </>
  )
}

export default TaskList
