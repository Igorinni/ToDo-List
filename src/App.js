import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pages from "./components/Pages";

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

  function displayTask(num){
    setPage(num);
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
      <Pages tasks={actualTasks} limit={limit} displayTask={displayTask}></Pages>
    </div>
  );
}

export default App;
