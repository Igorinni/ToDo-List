import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useMemo, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pages from "./components/Pages";

/* 
function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Покушать бананы в Эквадоре",
      completed: false,
    },
    {
      id: 2,
      title: "Заняться сёрфингом",
      completed: false,
    },
    {
      id: 3,
      title: "Побывать в Калифорнии",
      completed: false,
    },
    {
      id: 4,
      title: "Съездить на Карибы",
      completed: false,
    },
    {
      id: 5,
      title: "Сходить на концерт",
      completed: false,
    },
    {
      id: 6,
      title: "Купить бинокль",
      completed: false,
    },
  ])
  const handleTaskChange = (value) => {setTasks(value)}


  const [page, setPage] = useState(1);
  const [limit] = useState(5)
  const [lastTask, setLastTask] = useState(limit * page);
  const [firstTask, setFirstTask] = useState(lastTask - limit);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / limit); i++) {
    pageNumbers.push(i)
  }

  function displayTask(result){
    
    if (result === "Left") {
     (page === 1) ? setPage(page) : setPage(page - 1)
    } else if (result === "Right") {
      (page === pageNumbers.length) ? setPage(page) : setPage(page + 1)
    } else {
      setPage(result)
    }
    
  }

  const [actualTasks, setActualTasks] = useState(tasks);
  const [displayTasks, setDisplayTasks] = useState(actualTasks.slice(firstTask, lastTask))

  useEffect( () => {
    setLastTask(limit * page);
  }, [page])

  useEffect( () => {
    setFirstTask(lastTask - limit);
  }, [lastTask])

  useEffect(() => {
    setDisplayTasks(actualTasks.slice(firstTask, lastTask))
  }, [firstTask])

  useEffect(() => {
    setDisplayTasks(actualTasks.slice(firstTask, lastTask))
    
  }, [actualTasks])

  useEffect( () => {
    if (!displayTasks.find(item => item.completed == true)) {
      setActualTasks(tasks)
    }
  }, [tasks])        
  

  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id != id);
    setTasks(newTasks);
  }

  function checkTask(id){
    const newTasks = [...tasks]
    newTasks.forEach(elem => elem.id === id && (elem.completed = !elem.completed))
    setTasks(newTasks)
  }

  function filterTasks(status){

    if (status === "All") {
      const array = [...tasks];
      setActualTasks(array)
      setPage(1)
    } else {
      const array = [...tasks].filter(elem => elem.completed === status);
      setActualTasks(array)
      setPage(1)
    }
    
  }

  function sortTasks(condition){
    const newArray = [...actualTasks];
    newArray.sort( (a, b) => {
      if (condition === 'old') {
        if (a.date < b.date) return 1;
        if (a.date == b.date) return 0;
        if (a.date > b.date) return -1;
      }
      if (condition === 'new') {
        if (a.date > b.date) return 1;
        if (a.date == b.date) return 0;
        if (a.date < b.date) return -1;
      }
    })
    setActualTasks(newArray)
  }


  return (
    <div className="App">
      <Header></Header>
      <AddTaskInput tasks={tasks} setTasks={handleTaskChange}></AddTaskInput> 
      <ButtonFilterAndSort filterTasks={filterTasks} sortTasks={sortTasks}></ButtonFilterAndSort>
      <TaskList tasks={displayTasks} deleteTask={deleteTask} checkTask={checkTask}></TaskList>
      <Pages displayTask={displayTask} page={page} pageNumbers={pageNumbers}></Pages>
    </div>
  );
}
*/

function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Покушать бананы в Эквадоре",
      completed: false,
      date: 16686934194371,
    },
    {
      id: 2,
      title: "Заняться сёрфингом",
      completed: true,
      date: 16686934194372,
    },
    {
      id: 3,
      title: "Побывать в Калифорнии",
      completed: false,
      date: 16686934194373,
    },
    {
      id: 4,
      title: "Съездить на Карибы",
      completed: false,
      date: 16686934194374,
    },
    {
      id: 5,
      title: "Сходить на концерт",
      completed: false,
      date: 16686934194375,
    },
    {
      id: 6,
      title: "Купить бинокль",
      completed: false,
      date: 16686934194376,
    },
  ])
  const handleTaskChange = (value) => {setTasks(value)}


  const [page, setPage] = useState(1);
  const limit = 5;
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('old')
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / limit); i++) {
    pageNumbers.push(i)
  }
  

  const displayTasks = useMemo(() => {
    const lastTask = limit * page
    const firstTask = lastTask - limit;
    
    let kek = [];

    if (status === 'All') {
      
        const array = [...tasks].sort( (a, b) => {
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
        } )
        kek = array.slice(firstTask, lastTask);

    } else {

        const array = [...tasks].filter(elem => elem.completed === status)
        array.sort( (a, b) => {
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
  }, [tasks, page, status, sort])


  function goToPage(result){
    
    if (result === "Left") {
     (page === 1) ? setPage(page) : setPage(page - 1)
    } else if (result === "Right") {
      (page === pageNumbers.length) ? setPage(page) : setPage(page + 1)
    } else {
      setPage(result)
    }
    
  }  
  

  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id != id);
    setTasks(newTasks);
  }

  function checkTask(id){
    const newTasks = [...tasks]
    newTasks.forEach(elem => elem.id === id && (elem.completed = !elem.completed))
    setTasks(newTasks)
  }

  function filterTasks(status){
    setStatus(status)
    setPage(1)    
  }

  function sortTasks(condition){
    setSort(condition);    
  }


  return (
    <div className="App">
      <Header></Header>
      <AddTaskInput tasks={tasks} setTasks={handleTaskChange}></AddTaskInput> 
      <ButtonFilterAndSort filterTasks={filterTasks} sortTasks={sortTasks}></ButtonFilterAndSort>
      <TaskList tasks={displayTasks} deleteTask={deleteTask} checkTask={checkTask}></TaskList>
      <Pages goToPage={goToPage} page={page} pageNumbers={pageNumbers}></Pages>
    </div>
  );
}

export default App;
