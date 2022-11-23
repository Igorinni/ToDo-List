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

  const baseUrl = `https://todo-api-learning.herokuapp.com/v1/tasks/3`;

  const getTasks = async () => {
    try{
      const response = await axios.get(baseUrl, {
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
    await axios.post('https://todo-api-learning.herokuapp.com/v1/task/3', newTask);
    getTasks();
  }

  async function deleteTask(id) {
    await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${id}`);
    getTasks();
  }

  async function checkTask(task) {
   await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`, {
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
