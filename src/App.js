import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import { getArrayTasks, createTask, removeTask, saveStateTask } from "./services/api"

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
  const handleValueToSort = (value) => setValueToSort(value)

  const getTasks = async () => {
    try{
      const data = await getArrayTasks(valueToFilter, valueToSort, taskLimitPerPage, currentPage)
      setArrayToDisplayTasks(data.tasks);
      setAmountTask(data.count);
    } catch (error){
      console.log("У вас ошибка: " + error);
    }
  }

  useEffect( () => {
    getTasks();
  }, [valueToFilter, valueToSort, currentPage])

  const addTask = async (newTask) => {
    await createTask(newTask);
    getTasks();
  }

  const deleteTask = async (id) => {
    await removeTask(id);
    getTasks();
  }

  const checkTask = async (task) => {
    await saveStateTask(task);
    getTasks();
  }

  if (arrayToDisplayTasks == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }

  return (
    <div className="App">
      <Header />
      <AddTaskInput addTask={addTask} />
      <ButtonFilterAndSort valueToFilter={valueToFilter} handleValueToFilter={handleValueToFilter} valueToSort={valueToSort} handleValueToSort={handleValueToSort} />
      <TaskList arrayToDisplayTasks={arrayToDisplayTasks} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} />
      <Pagination  currentPage={currentPage} setСurrentPage={setСurrentPage} taskLimitPerPage={taskLimitPerPage} amountTask={amountTask} arrayToDisplayTasks={arrayToDisplayTasks} />
    </div>
  );
}

export default App;
