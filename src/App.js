import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useMemo, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";

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
  const handleTaskChange = (value) => { setTasks(value) }


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

export default App;
