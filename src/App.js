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

  const [sortingBy, setSortingBy] = useState("asc");
  const handleSortingBy = (value) => setSortingBy(value);

  const [loadingPage, setLoadingPage] = useState(false);

  const [errorText, setErrorText] = useState("");
  const handleErrorText = (text) => {
    setErrorText(text);
  };

  const requestProcessing = async (promise) => {
    try {
      setLoadingPage(true);
      const response = await promise;
      return response;
    } catch (error) {
      setErrorText(error.response.data.message);
    } finally {
      setLoadingPage(false);
    }
  };

  const getTasks = async () => {
    const data = await requestProcessing(
      getArrayTasks({ filteringBy, sortingBy, taskLimitPerPage, currentPage })
    );
    setTasksList(data.tasks);
    setTaskAmount(data.count);
  };

  const addTask = async (newTask) => {
    await requestProcessing(createTask(newTask));
    getTasks();
  };

  const deleteTask = async (id) => {
    await requestProcessing(removeTask(id));
    getTasks();
  };

  const checkTask = async (task) => {
    await requestProcessing(saveStateTask(task));
    getTasks();
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
    <div className="App">
      {errorText && (
        <Error errorText={errorText} handleErrorText={handleErrorText} />
      )}
      <Header />
      <AddTaskInput addTask={addTask} loadingPage={loadingPage} />
      <ButtonFilterAndSort
        filteringBy={filteringBy}
        handleFilteringBy={handleFilteringBy}
        sortingBy={sortingBy}
        handleSortingBy={handleSortingBy}
      />
      <TaskList
        tasksList={tasksList}
        deleteTask={deleteTask}
        checkTask={checkTask}
        getTasks={getTasks}
        loadingPage={loadingPage}
      />
      <Pagination
        currentPage={currentPage}
        setСurrentPage={setСurrentPage}
        taskLimitPerPage={taskLimitPerPage}
        taskAmount={taskAmount}
        tasksList={tasksList}
      />
    </div>
  );
}

export default App;
