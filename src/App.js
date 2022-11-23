import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import axios from 'axios';

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
      const response = await axios.get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASKS + process.env.REACT_APP_USER_ID, {
        params: {
          filterBy: valueToFilter,
          order: valueToSort,
          pp: taskLimitPerPage,
          page: currentPage,
        }
      });
      setArrayToDisplayTasks(response.data.tasks);
      setAmountTask(response.data.count);
    } catch (error){
      console.log("У вас ошибка: " + error);
    }
  }

  useEffect( () => {
    getTasks();
  }, [valueToFilter, valueToSort, currentPage])

  async function addTask(newTask){
    await axios.post(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASK + process.env.REACT_APP_USER_ID, newTask);
    getTasks();
  }

  async function deleteTask(id) {
    await axios.delete(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASK + process.env.REACT_APP_USER_ID + id);
    getTasks();
  }

  async function checkTask(task) {
   await axios.patch(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SECTION_TASK + process.env.REACT_APP_USER_ID + task.uuid, {
      name: task.name,
      done: !task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
   });
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
