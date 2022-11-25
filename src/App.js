import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import { getArrayTasks, createTask, removeTask, saveStateTask } from "./services/RequestApi";

function App() {

  const [arrayToDisplayTasks, setArrayToDisplayTasks] = useState([]);
  const [amountTask, setAmountTask] = useState(0);

  const [currentPage, setСurrentPage] = useState(1);
  const taskLimitPerPage = 5;

  const [filteringValue, setFilteringValue] = useState('');
  const handleFilteringValue = (value) => {
      setFilteringValue(value);
      setСurrentPage(1);
  }

  const [sortingValue, setSortingValue] = useState('asc');
  const handleSortingValue = (value) => setSortingValue(value);

  const [loadingPage, setLoadingPage] = useState(false);

  const [errorText, setErrorText] = useState('');
  const handleErrorText = (text) => {
      setErrorText(text);
  }


  function requestProcessing(promise) {
    setLoadingPage(true);
    return promise
      .catch(error => {
        setErrorText(error.response.data.message);
      })
      .finally( () => setLoadingPage(false) )
  }


  function getTasks () {
    requestProcessing(getArrayTasks({filteringValue, sortingValue, taskLimitPerPage, currentPage}))
      .then( response => {
        setArrayToDisplayTasks(response.tasks);
        setAmountTask(response.count)})
  }

  function addTask (newTask) {
    requestProcessing(createTask(newTask))
      .then( () => getTasks())
  }
 
  const deleteTask = (id) => {
    requestProcessing(removeTask(id))
      .then( () => getTasks())
  }

  const checkTask = (task) => {
    requestProcessing(saveStateTask(task))
      .then( () => getTasks())
  }


  useEffect( () => {
    getTasks();
  }, [filteringValue, sortingValue, currentPage])

  useEffect( () => {
    errorText != '' && setTimeout( () => handleErrorText(''), 3000);
  },  [errorText] )
  


  if (arrayToDisplayTasks == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }


  return (
    <div className="App">
      {errorText && <Error errorText={errorText} handleErrorText={handleErrorText}  />}
      <Header />
      <AddTaskInput addTask={addTask} loadingPage={loadingPage} />
      <ButtonFilterAndSort filteringValue={filteringValue} handleFilteringValue={handleFilteringValue} sortingValue={sortingValue} handleSortingValue={handleSortingValue} /> 
      <TaskList arrayToDisplayTasks={arrayToDisplayTasks} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} loadingPage={loadingPage} />
      <Pagination  currentPage={currentPage} setСurrentPage={setСurrentPage} taskLimitPerPage={taskLimitPerPage} amountTask={amountTask} arrayToDisplayTasks={arrayToDisplayTasks} />
    </div>
  );
}

export default App;
