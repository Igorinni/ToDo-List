import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useMemo, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";
import axios from 'axios';
/* 
function App() {
  
  const [tasks, setTasks] = useState([])
  const handleTaskChange = (value) => { setTasks(value) }

  useEffect( () => {
    axios
      .get('https://todo-api-learning.herokuapp.com/v1/tasks/3?order=asc&pp=5&page=1') 
      .then( res => setTasks(res.data.tasks))
      .catch( error => console.error("ОШибка вот: ", error))
  }, [])

  const [nowPage, setNowPage] = useState(1);
  const limit = 5;
  const [valueFilter, setValueFilter] = useState('All');
  const [sort, setSort] = useState('old');
  const [controlChangeTask, setControlChangeTask] = useState(false);

  let pageNumbers = [];

  const displayTasks = useMemo(() => {
    const lastTask = limit * nowPage
    const firstTask = lastTask - limit;

    let kek = [];
    

    if (valueFilter === 'All') {

      const array = [...tasks].sort((a, b) => {
        if (sort === 'old') {
          if (a.date < b.date) return 1;
          if (a.date == b.date) return 0;
          if (a.date > b.date) return -1;
        }
        if (sort === 'new') {
          if (a.date > b.date) return 1;
          if (a.date == b.date) return 0;
          if (a.date < b.date) return -1;
        }
      })
      kek = array.slice(firstTask, lastTask);

      for (let i = 1; i <= Math.ceil(tasks.length / limit); i++) {
        pageNumbers.push(i)
      }

    } else {

      const array = [...tasks].filter(elem => elem.completed === valueFilter)

      for (let i = 1; i <= Math.ceil(array.length / limit); i++) {
        pageNumbers.push(i)
      }

      array.sort((a, b) => {
        if (sort === 'old') {
          if (a.date < b.date) return 1;
          if (a.date == b.date) return 0;
          if (a.date > b.date) return -1;
        }
        if (sort === 'new') {
          if (a.date > b.date) return 1;
          if (a.date == b.date) return 0;
          if (a.date < b.date) return -1;
        }
      })
      kek = array.slice(firstTask, lastTask)

    }

    return kek;
  }, [tasks, nowPage, valueFilter, sort, controlChangeTask])


  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id != id);
    setTasks(newTasks);
  }

  function checkTask(id) {
    const newTasks = [...tasks]
    newTasks.forEach(elem => elem.id === id && (elem.completed = !elem.completed))
    setTasks(newTasks)
  }

  function filterTasks(value) {
    setValueFilter(value)
    setNowPage(1)
  }

  function sortTasks(condition) {
    setSort(condition);
  }

  if (displayTasks == 0 && nowPage > 1) {
    setNowPage(nowPage - 1)
  }

  return (
    <div className="App">
      <Header />
      <AddTaskInput tasks={tasks} setTasks={handleTaskChange} />
      <ButtonFilterAndSort filterTasks={filterTasks} sort={sort} sortTasks={sortTasks} valueFilter={valueFilter} />
      <TaskList displayTasks={displayTasks} deleteTask={deleteTask} checkTask={checkTask} totalTasks={tasks} 
      controlChangeTask={controlChangeTask} setControlChangeTask={setControlChangeTask} />
      <Pagination setNowPage={setNowPage} nowPage={nowPage} pageNumbers={pageNumbers} tasks={displayTasks} />
    </div>
  );
}
 */

function App() {
  
  const [displayTasks, setDisplayTasks] = useState([])
  const handleTaskChange = (value) => { setDisplayTasks(value) }
  const [amountTask, setAmountTask] = useState(0)

  const [nowPage, setNowPage] = useState(2);
  const limit = 20;
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
  }, [filter, sort])

  async function addTask(newTask){
    await axios.post('https://todo-api-learning.herokuapp.com/v1/task/3', newTask)
    getTasks()
  }

  function filterTasks(value) {
    setValueFilter(value);
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
