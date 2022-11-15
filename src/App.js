import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { useState } from "react";

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


  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id != id);
    setTasks(newTasks);
  }

  function checkTask(id){
    const newTasks = [...tasks]
    newTasks.forEach(elem => elem.id === id ? elem.completed = !elem.completed : '')
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <Header></Header>
      <AddTask tasks={tasks} setTasks={setTasks}></AddTask>
      <TaskList tasks={tasks} deleteTask={deleteTask} checkTask={checkTask}></TaskList>
    </div>
  );
}

export default App;
