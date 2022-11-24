import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import Error from "./components/Error";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import { getArrayTasks, createTask, removeTask, saveStateTask } from "./services/RequestApi"

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
  const [errorText, setErrorText] = useState('');
  const handleErrorText = (text) => {
    setErrorText(text);
    // setTimeout(() => handleErrorText(''), 10000);
  }

  const getTasks = async () => {
    try{
      const data = await getArrayTasks(valueToFilter, valueToSort, taskLimitPerPage, currentPage)
      setArrayToDisplayTasks(data.tasks);
      setAmountTask(data.count);
    } catch (error){
      handleErrorText(`Что-то пошло не так. ${error}`);
    }
  }

  useEffect( () => {
    getTasks();
  }, [valueToFilter, valueToSort, currentPage])


  const addTask = async (newTask) => {
    try {
      await createTask(newTask);
      getTasks();
    } catch (error) {
      handleErrorText(`Такое задание уже существует. ${error}`);
    }
    
  }

  const deleteTask = async (id) => {
    try {
      await removeTask(id);
      getTasks();
    } catch (error) {
      handleErrorText(`Слишком быстро удаляете. ${error}`);
    }
    
  }

  const checkTask = async (task) => {
    try {
      await saveStateTask(task);
      getTasks();
    } catch (error) {
      handleErrorText(`Что-то пошло не так при измении статуса задачи. ${error}`);
    }
    
  }

  if (arrayToDisplayTasks == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }


  return (
    <div className="App">
      {errorText && <Error errorText={errorText} />}
      <Header />
      <AddTaskInput addTask={addTask} />
      <ButtonFilterAndSort valueToFilter={valueToFilter} handleValueToFilter={handleValueToFilter} valueToSort={valueToSort} handleValueToSort={handleValueToSort} />
      <TaskList arrayToDisplayTasks={arrayToDisplayTasks} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} />
      <Pagination  currentPage={currentPage} setСurrentPage={setСurrentPage} taskLimitPerPage={taskLimitPerPage} amountTask={amountTask} arrayToDisplayTasks={arrayToDisplayTasks} />
    </div>
  );
}

export default App;
