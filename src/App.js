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
    }
  ])

  const handleTaskChange = (value) => {setTasks(value)}

  const [actualTasks, setActualTasks] = useState(tasks)

  useEffect( () => {
    setActualTasks(tasks)
  }, [tasks] )

  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id != id);
    setTasks(newTasks);
  }

  function checkTask(id){
    const newTasks = [...tasks]
    newTasks.forEach(elem => elem.id === id && (elem.completed = !elem.completed))
    setTasks(newTasks)
  }

  function displayActualTasks(condition){
    
    if (condition === "All") {
      const newArray = [...tasks]
      setActualTasks(newArray)
    } else {
      const newArray = [...tasks].filter(elem => elem.completed == condition)
      setActualTasks(newArray)
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
      <ButtonFilterAndSort displayActualTasks={displayActualTasks} sortTasks={sortTasks}></ButtonFilterAndSort>
      <TaskList tasks={actualTasks} deleteTask={deleteTask} checkTask={checkTask}></TaskList>
      <Pages tasks={tasks} setActualTasks={setActualTasks}></Pages>
    </div>
  );
}

export default App;
