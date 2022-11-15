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

  return (
    <div className="App">
      <Header></Header>
      <AddTask></AddTask>
      <TaskList tasks={tasks}></TaskList>
    </div>
  );
}

export default App;
