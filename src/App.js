import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import axios from 'axios';

function App() {
  
  const [displayTasks, setDisplayTasks] = useState([])
  const [amountTask, setAmountTask] = useState(0)

  const [nowPage, setNowPage] = useState(1);
  const limit = 5;
  const [filter, setValueFilter] = useState('');
  const [sort, setSort] = useState('asc');

  const baseUrl = `https://todo-api-learning.herokuapp.com/v1/tasks/3`;

  const getTasks = async () => {
    try{
      const response = await axios.get(baseUrl, {
        params: {
          filterBy: filter,
          order: sort,
          pp: limit,
          page: nowPage,
        }
      }) 
      setDisplayTasks(response.data.tasks)
      setAmountTask(response.data.count)
    } catch (error){
      console.log("У вас ошибка: " + error)
    }
  }

  useEffect( () => {
    getTasks()
  }, [filter, sort, nowPage])

  async function addTask(newTask){
    await axios.post('https://todo-api-learning.herokuapp.com/v1/task/3', newTask) 
    getTasks()
  }

  function filterTasks(value) {
    setValueFilter(value);
    setNowPage(1)
  }

  function sortTasks(condition) {
    setSort(condition);
  }

  async function deleteTask(id) {
    await axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/3/${id}`)
    getTasks()
  }

  async function checkTask(task) {
   await axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/3/${task.uuid}`, {
      name: task.name,
      done: !task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
   })
   getTasks()
  }


  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(amountTask / limit); i++) {
    pageNumbers.push(i)
  }

  if (displayTasks === 0 && nowPage > 1) {
    setNowPage(nowPage - 1)
  }

  return (
    <div className="App">
      <Header />
      <AddTaskInput tasks={displayTasks} addTask={addTask} />
      <ButtonFilterAndSort filterTasks={filterTasks} sort={sort} sortTasks={sortTasks} valueFilter={filter} />
      <TaskList displayTasks={displayTasks} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} />
      <Pagination setNowPage={setNowPage} nowPage={nowPage} pageNumbers={pageNumbers} tasks={displayTasks} />
    </div>
  );
}

export default App;
