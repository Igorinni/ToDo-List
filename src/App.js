import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState, useMemo } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import { ChakraProvider, Box, Spinner } from "@chakra-ui/react";
import theme from "./styles/theme";
import AuthBattons from "./components/AuthBattons";
import { registration, login, deleteUser } from "./services/RequestAuth";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, addTodo, deleteTodo, checkTodo } from "./store/todoSlice";
import { registerUser, loginUser, deleteAccount } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { todos, errorTodo, loadingPage } = useSelector((state) => state.todos);
  // const { errorAuth, loadingAuth, token, username, userId } = useSelector(
  //   (state) => state.user
  // );
  const { errorAuth, loadingAuth } = useSelector((state) => state.user);

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
  const handleErrorText = (text) => {
    setErrorText(text);
  };

  const [usernameAuth, setUsernameAuth] = useState(
    localStorage.getItem("username")
  );

  // console.log('errorAuth: ', errorAuth);
  // console.log('errorTodo: ', errorTodo);

  const changeErrorText = useMemo(() => {
    if (errorAuth) setErrorText(String(errorAuth));
    if (errorTodo) setErrorText(String(errorTodo));
  }, [errorAuth, errorTodo]);

  const getTasks = async () => {
    if (!localStorage.getItem("token")) return null; // нужно, чтобы ошибка не вылетала, когда незалогинен
    scanLocalStorage();
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

  useEffect(() => {
    getTasks();
  }, [filteringBy, sortingBy, currentPage, usernameAuth]);

  useEffect(() => {
    errorTodo !== null && handleErrorText(errorTodo);
    errorTodo === null && setTimeout(() => handleErrorText(null), 4000);
  }, [errorTodo]);

  if (todos.length == 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }

  const logining = async (candidate) => {
    dispatch(loginUser({ candidate })).then(() => {
      setUsernameAuth(localStorage.getItem("username"));
      getTasks();
    });
  };

  const register = async (candidate) => {
    dispatch(registerUser({ candidate })).then(() => {
      setUsernameAuth(localStorage.getItem("username"));
      getTasks();
    });
  };

  const deleteAcc = async () => {
    try {
      const str = "@@@";
      dispatch(deleteAccount({ str })).then(() =>
        setUsernameAuth(localStorage.getItem("username"))
      );
      // await deleteUser(localStorage.getItem("userId"));
      // cleanLocalStorage();
    } catch (error) {
      // setErrorText(error.response.data.message);
      console.log(`jopa 7`);
    }
  };

  function cleanLocalStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsernameAuth("");
  }

  function scanLocalStorage() {
    if (
      !localStorage.getItem("token") ||
      !localStorage.getItem("username") ||
      !localStorage.getItem("userId")
    ) {
      cleanLocalStorage();
    }
  }

  return (
    <ChakraProvider theme={theme}>
      {!(errorText === null) && (
        <Error errorText={errorText} handleErrorText={handleErrorText} />
      )}
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
          cleanLocalStorage={cleanLocalStorage}
          usernameAuth={usernameAuth}
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
          usernameAuth={usernameAuth}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          taskLimitPerPage={taskLimitPerPage}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
