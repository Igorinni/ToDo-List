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

  const [valueToFilter, setValueToFilter] = useState('');
  const handleValueToFilter = (value) => {
      setValueToFilter(value);
      setСurrentPage(1);
  }

  const [valueToSort, setValueToSort] = useState('asc');
  const handleValueToSort = (value) => setValueToSort(value);

  const [loadingPage, setLoadingPage] = useState(false);

  const [errorText, setErrorText] = useState('');
  const handleErrorText = (text) => {
      setErrorText(text);
  }


  function requestProcessing(promise, status = null) {
    setLoadingPage(true);
    return promise
      .catch(error => {
        status === 'get' && setErrorText(`Что-то пошло не так. ${error}`);
        status === 'add' && setErrorText(`Такое задание уже существует. ${error}`);
        status === 'del' && setErrorText(`Слишком быстро удаляете. ${error}`);
        status === 'check' && setErrorText(`Что-то пошло не так при измении статуса задачи. ${error}`);
      })
      .finally( () => setLoadingPage(false) )
  }


  function getTasks () {
    requestProcessing(getArrayTasks(valueToFilter, valueToSort, taskLimitPerPage, currentPage), 'get')
      .then( response => {
        setArrayToDisplayTasks(response.tasks);
        setAmountTask(response.count)})
  }

  function addTask (newTask) {
    requestProcessing(createTask(newTask), 'add')
      .then( () => getTasks())
  }
 
  const deleteTask = (id) => {
    requestProcessing(removeTask(id), 'del')
      .then( () => getTasks())
  }

  const checkTask = (task) => {
    requestProcessing(saveStateTask(task), 'check')
      .then( () => getTasks())
  }


  useEffect( () => {
    getTasks();
  }, [valueToFilter, valueToSort, currentPage])


  if (arrayToDisplayTasks == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }


  return (
    <div className="App">
      {errorText && <Error errorText={errorText} handleErrorText={handleErrorText}  />}
      <Header />
      <AddTaskInput addTask={addTask} loadingPage={loadingPage} />
      <ButtonFilterAndSort valueToFilter={valueToFilter} handleValueToFilter={handleValueToFilter} valueToSort={valueToSort} handleValueToSort={handleValueToSort} />
      <TaskList arrayToDisplayTasks={arrayToDisplayTasks} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} loadingPage={loadingPage} />
      <Pagination  currentPage={currentPage} setСurrentPage={setСurrentPage} taskLimitPerPage={taskLimitPerPage} amountTask={amountTask} arrayToDisplayTasks={arrayToDisplayTasks} />
    </div>
  );
}

export default App;
