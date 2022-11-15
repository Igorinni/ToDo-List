import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

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
    }
  ])

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
    newTasks.forEach(elem => elem.id === id ? elem.completed = !elem.completed : '')
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
      <AddTask tasks={tasks} setTasks={setTasks}></AddTask>

      <div className="filterAndSort">
        <ul className="filterTasks">
          <li onClick={() => displayActualTasks('All')}>All</li>
          <li onClick={() => displayActualTasks(true)}>Done</li>
          <li onClick={() => displayActualTasks(false)}>Undone</li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><FaArrowCircleUp className="sortUp" onClick={() => sortTasks('old')}></FaArrowCircleUp></li>
          <li><FaArrowCircleDown className="sortDown" onClick={() => sortTasks('new')}></FaArrowCircleDown></li>
        </ul>
      </div>

      <TaskList tasks={actualTasks} deleteTask={deleteTask} checkTask={checkTask}></TaskList>
    </div>
  );
}

export default App;
