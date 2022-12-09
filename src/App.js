import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import {
  getArrayTasks,
  createTask,
  removeTask,
  saveStateTask,
} from "./services/RequestApi";
import { ChakraProvider, Box, Spinner } from "@chakra-ui/react";
import theme from "./styles/theme";

function App() {
  const [tasksList, setTasksList] = useState([]);
  const [taskAmount, setTaskAmount] = useState(0);

  const [currentPage, setСurrentPage] = useState(1);
  const taskLimitPerPage = 5;

  const [filteringBy, setFilteringBy] = useState("");
  const handleFilteringBy = (value) => {
    setFilteringBy(value);
    setСurrentPage(1);
  };

  const [sortingBy, setSortingBy] = useState("desc");
  const handleSortingBy = (value) => setSortingBy(value);

  const [loadingPage, setLoadingPage] = useState(false);
  const handleLoadingPage = (status) => {
    setLoadingPage(status);
  };

  const [errorText, setErrorText] = useState("");
  const handleErrorText = (text) => {
    setErrorText(text);
  };

  const requestProcessing = async (promise) => {
    try {
      handleLoadingPage(true);
      const response = await promise;
      return response;
    } catch (error) {
      setErrorText(error.response.data.message);
    } finally {
      handleLoadingPage(false);
    }
  };

  const getTasks = async () => {
    try {
      const data = await requestProcessing(
        getArrayTasks({ filteringBy, sortingBy, taskLimitPerPage, currentPage })
      );
      setTasksList(data.rows);
      setTaskAmount(data.count);
    } catch (error) {
      setErrorText(error.response.data.message);
    }
  };

  const addTask = async (newTask) => {
    try {
      await requestProcessing(createTask(newTask));
      getTasks();
    } catch (error) {
      setErrorText(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await requestProcessing(removeTask(id));
      getTasks();
    } catch (error) {
      setErrorText(error.response.data.message);
    }
  };

  const checkTask = async (task) => {
    try {
      await requestProcessing(saveStateTask(task));
      getTasks();
    } catch (error) {
      setErrorText(error.response.data.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, [filteringBy, sortingBy, currentPage]);

  useEffect(() => {
    errorText != "" && setTimeout(() => handleErrorText(""), 3000);
  }, [errorText]);

  if (tasksList.length == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }

  return (
    <ChakraProvider theme={theme}>
      {errorText && (
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
        ></Spinner>
      )}
      <Box
        w="100%"
        h="100%"
        bg="#ffffffb0"
        p="5"
        my="20"
        mx="auto"
        maxW="600"
        textAlign="center"
        borderRadius="10"
        fontFamily="Playfair Display"
      >
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
        />
        <Pagination
          currentPage={currentPage}
          setСurrentPage={setСurrentPage}
          taskLimitPerPage={taskLimitPerPage}
          taskAmount={taskAmount}
          tasksList={tasksList}
          loadingPage={loadingPage}
        />
      </Box>
    </ChakraProvider>
  );
}

export default App;
