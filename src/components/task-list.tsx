import { Text } from '@chakra-ui/react'
import { useAppSelector } from '../hooks/redux'
import Task from './task'
import { ActuallyTask } from '../general-types'

function TaskList({
  deleteTask,
  checkTask,
  saveChangedTitle,
}: {
  deleteTask: (id: string) => Promise<void>
  checkTask: (task: ActuallyTask) => Promise<void>
  saveChangedTitle: ({
    newValue,
    task,
  }: {
    newValue: string
    task: ActuallyTask
  }) => Promise<void>
}) {
  const tasksList = useAppSelector((state) => state.todos.todos)
  const { usernameAuth } = useAppSelector((state) => state.user)

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
        tasksList.map((elem) => (
          <Task
            key={elem.uuid}
            task={elem}
            deleteTask={deleteTask}
            checkTask={checkTask}
            saveChangedTitle={saveChangedTitle}
          />
        ))}
    </>
  )
}

export default TaskList
