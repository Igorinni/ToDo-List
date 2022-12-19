import Header from './components/header'
import AddTaskInput from './components/add-task'
import TaskList from './components/task-list'
import ErrorModal from './components/error-modal-window'
import { useEffect, useState } from 'react'
import ButtonFilterAndSort from './components/button-filter-sort'
import Pagination from './components/pagination'
import {
  getArrayTasks,
  createTask,
  removeTask,
  saveStateTask,
} from './services/request-tasks'
import { ChakraProvider, Box, Spinner } from '@chakra-ui/react'
import theme from './styles/theme'
import AuthBattons from './components/auth-buttons'
import { registration, login, deleteUser } from './services/request-auth'
import { newTask, TaskObj, User } from './task-user.types'

function App() {
  const [tasksList, setTasksList] = useState([])
  const [taskAmount, setTaskAmount] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const taskLimitPerPage = 5

  const [filteringBy, setFilteringBy] = useState('')
  const handleFilteringBy = (value: string) => {
    setFilteringBy(value)
    setCurrentPage(1)
  }

  const [sortingBy, setSortingBy] = useState('desc')
  const handleSortingBy = (value: string) => setSortingBy(value)

  const [loadingPage, setLoadingPage] = useState(false)
  const handleLoadingPage = (status: boolean) => {
    setLoadingPage(status)
  }

  const [errorText, setErrorText] = useState('')
  const handleErrorText = (text: string) => {
    setErrorText(text)
  }

  const [usernameAuth, setUsernameAuth] = useState('')

  const requestProcessing = async (promise) => {
    try {
      handleLoadingPage(true)
      const response: any = await promise
      return response
    } catch (error) {
      setErrorText(error.response.data.message)
    } finally {
      handleLoadingPage(false)
    }
  }

  type responseTasks = {
    count: number
    tasks: Array<object>
  }

  const getTasks = async () => {
    try {
      if (!localStorage.getItem('token')) return null
      const data /* responseTasks */ = await requestProcessing(
        getArrayTasks({ filteringBy, sortingBy, taskLimitPerPage, currentPage })
      )
      setTasksList(data.tasks)
      setTaskAmount(data.count)
      setUsernameAuth(localStorage.getItem('username')!)
    } catch (error) {
      updateLocalStorage()
      setErrorText(error.response.data.message)
    }
  }

  const addTask = async (newTask: newTask) => {
    try {
      await requestProcessing(createTask(newTask))
      await getTasks()
    } catch (error) {
      setErrorText(error.response.data.message)
    }
  }

  const deleteTask = async (uuid: string) => {
    try {
      await requestProcessing(removeTask(uuid))
      getTasks()
    } catch (error) {
      setErrorText(error.response.data.message)
    }
  }

  const checkTask = async (task: TaskObj) => {
    try {
      await requestProcessing(saveStateTask(task))
      getTasks()
    } catch (error) {
      setErrorText(error.response.data.message)
    }
  }

  useEffect(() => {
    getTasks()
  }, [filteringBy, sortingBy, currentPage, usernameAuth])

  useEffect(() => {
    errorText != '' && setTimeout(() => handleErrorText(''), 3000)
  }, [errorText])

  if (tasksList.length == 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }

  type ResponseAuth = {
    token: string
    username: string
    userId: string
  }

  const logining = async (candidate: User) => {
    try {
      const res: ResponseAuth = await login(candidate)
      saveLocalStorage(res.token, res.username, res.userId)
    } catch (error) {
      error.response.data['errors']
        ? setErrorText(error.response.data.errors[0].msg)
        : setErrorText(error.response.data.message)
    }
  }

  const register = async (candidate: User) => {
    try {
      const res: ResponseAuth = await registration(candidate)
      saveLocalStorage(res.token, res.username, res.userId)
    } catch (error) {
      error.response.data['errors']
        ? setErrorText(error.response.data.errors[0].msg)
        : setErrorText(error.response.data.message)
    }
  }

  const deleteAccount = async () => {
    try {
      await deleteUser(localStorage.getItem('userId')!)
      updateLocalStorage()
    } catch (error) {
      setErrorText(error.response.data.message)
    }
  }

  const saveLocalStorage = (token: string, username: string, userId: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
    setUsernameAuth(username)
  }

  const updateLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    setUsernameAuth('')
  }

  return (
    <ChakraProvider theme={theme}>
      {errorText && (
        <ErrorModal errorText={errorText} />
      )}
      {loadingPage && (
        <Spinner
          position='absolute'
          top='0'
          right='0'
          bottom='0'
          left='0'
          margin='auto'
          height='70px'
          width='70px'
          speed='0.9s'
          emptyColor='gray.200'
          color='blue.500'
          label='string'
        ></Spinner>
      )}
      <Box
        w='100%'
        h='100%'
        bg='rgba(255, 255, 255, 0.8)'
        p='5'
        py='7px'
        my='20'
        mx='auto'
        maxW='600'
        textAlign='center'
        borderRadius='10'
        fontFamily='Playfair Display'
      >
        <AuthBattons
          logining={logining}
          register={register}
          updateLocalStorage={updateLocalStorage}
          usernameAuth={usernameAuth}
          deleteAccount={deleteAccount}
        />
        <Header />
        <AddTaskInput addTask={addTask} loadingPage={loadingPage} />
        <ButtonFilterAndSort
          filteringBy={filteringBy}
          handleFilteringBy={handleFilteringBy}
          sortingBy={sortingBy}
          handleSortingBy={handleSortingBy}
          loadingPage={loadingPage}
        />
        <TaskList
          tasksList={tasksList}
          deleteTask={deleteTask}
          checkTask={checkTask}
          getTasks={getTasks}
          loadingPage={loadingPage}
          setErrorText={setErrorText}
          handleLoadingPage={handleLoadingPage}
          usernameAuth={usernameAuth}
        />
      <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          taskLimitPerPage={taskLimitPerPage}
          taskAmount={taskAmount}
          tasksList={tasksList}
          loadingPage={loadingPage}
        />
      </Box>
    </ChakraProvider>
  )
}

export default App
