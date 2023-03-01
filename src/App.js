import Header from "./components/Header";
import AddTaskInput from "./components/add-task-input.tsx";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState, useMemo } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import { ChakraProvider, Box, Spinner } from "@chakra-ui/react";
import theme from "./styles/theme";
import AuthBattons from "./components/AuthBattons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  addTodo,
  deleteTodo,
  checkTodo,
  cleanerErrorTodo,
  saveChangeTaskTitle,
} from "./store/todo-slice.ts";
import {
  registerUser,
  loginUser,
  deleteAccount,
  cleanerLocal,
  cleanerErrorUser,
  setUsername,
} from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { errorTodo, loadingPage } = useSelector((state) => state.todos);
  const { errorAuth, loadingAuth, usernameAuth } = useSelector(
    (state) => state.user
  );

  const [currentPage, setCurrentPage] = useState(1);
  const taskLimitPerPage = 5;

  const [filteringBy, setFilteringBy] = useState("");
  const handleFilteringBy = (value) => {
    setFilteringBy(value);
    setCurrentPage(1);
  };

  const [sortingBy, setSortingBy] = useState("desc");
  const handleSortingBy = (value) => setSortingBy(value);

  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    dispatch(setUsername());
  }, []);

  useEffect(() => {
    if (errorAuth || errorTodo) {
      setErrorText(errorAuth || errorTodo);
      const time = setTimeout(() => {
        setErrorText(null);
        dispatch(cleanerErrorUser());
        dispatch(cleanerErrorTodo());
      }, 5000);
      // clearTimeout(time); - не работает почему то
    }
  }, [errorAuth, errorTodo]);

  const getTasks = async () => {
    if (!localStorage.getItem("token")) return null; // нужно, чтобы ошибка не вылетала, когда незалогинен
    if (
      !localStorage.getItem("token") ||
      !localStorage.getItem("username") ||
      !localStorage.getItem("userId")
    ) {
      dispatch(cleanerLocal());
    }
    dispatch(
      getTodos({ filteringBy, sortingBy, taskLimitPerPage, currentPage })
    );
  };

  const addTask = async (newTask) => {
    dispatch(addTodo({ newTask })).then(() => getTasks());
  };

  const deleteTask = async (id) => {
    dispatch(deleteTodo({ id })).then(() => getTasks());
  };

  const checkTask = async (task) => {
    dispatch(checkTodo({ task })).then(() => getTasks());
  };

  const saveChangedTitle = async (newValue, task) => {
    dispatch(saveChangeTaskTitle({ newValue, task })).then(() => getTasks());
  };

  useEffect(() => {
    getTasks();
  }, [filteringBy, sortingBy, currentPage, usernameAuth]);

  const logining = async (candidate) => {
    dispatch(loginUser({ candidate })).then(() => {
      getTasks();
    });
  };

  const register = async (candidate) => {
    dispatch(registerUser({ candidate })).then(() => {
      getTasks();
    });
  };

  const deleteAcc = async () => {
    const userIdNow = localStorage.getItem("userId");
    dispatch(deleteAccount({ userIdNow })).then(() => dispatch(cleanerLocal()));
  };

  return (
    <ChakraProvider theme={theme}>
      {!(errorText === null) && <Error errorText={errorText} />}
      {loadingPage && (
        <Spinner
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          margin="auto"
          height="70px"
          width="70px"
          speed="0.9s"
          emptyColor="gray.200"
          color="blue.500"
          label="string"
          zIndex="99"
        ></Spinner>
      )}
      {loadingAuth && (
        <Spinner
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          margin="auto"
          height="70px"
          width="70px"
          speed="0.9s"
          emptyColor="gray.200"
          color="red.500"
          label="string"
          zIndex="99"
        ></Spinner>
      )}
      <Box
        w="100%"
        h="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p="5"
        py="7px"
        my="20"
        mx="auto"
        maxW="600"
        textAlign="center"
        borderRadius="10"
        fontFamily="Playfair Display"
      >
        <AuthBattons
          logining={logining}
          register={register}
          deleteAcc={deleteAcc}
        />
        <Header />
        <AddTaskInput addTask={addTask} />
        <ButtonFilterAndSort
          filteringBy={filteringBy}
          handleFilteringBy={handleFilteringBy}
          sortingBy={sortingBy}
          handleSortingBy={handleSortingBy}
        />
        {errorTodo && <h2 style={{ color: "red" }}>{errorTodo}</h2>}
        <TaskList
          deleteTask={deleteTask}
          checkTask={checkTask}
          getTasks={getTasks}
          setErrorText={setErrorText}
          saveChangedTitle={saveChangedTitle}
        />
        {usernameAuth && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            taskLimitPerPage={taskLimitPerPage}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
