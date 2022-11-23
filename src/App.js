import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useMemo, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";

function App() {
  
  const [tasks, setTasks] = useState([])
  const handleTaskChange = (value) => { setTasks(value) }

  const [nowPage, setNowPage] = useState(1);
  const limit = 5;
  const [valueFilter, setValueFilter] = useState('All');
  const [sort, setSort] = useState('old');
  const [controlChangeTask, setControlChangeTask] = useState(false);
  const [paginationArray, setPaginationArray] = useState(tasks)

  

  const displayTasks = useMemo(() => {
    const lastTask = limit * nowPage
    const firstTask = lastTask - limit;
    let kek = [];

    if (valueFilter === 'All') {
      
      kek = sortingArray(tasks).slice(firstTask, lastTask);
      setPaginationArray(tasks)

    } else {

      const array = [...tasks].filter(elem => elem.completed === valueFilter)
      kek = sortingArray(array).slice(firstTask, lastTask)
      setPaginationArray(array)

    }

    return kek;
  }, [tasks, nowPage, valueFilter, sort, controlChangeTask])


  function deleteTask(id) {
    const newTasks = [...tasks].filter(elem => elem.id !== id);
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

  function sortingArray(array) {
    const newArray = [...array];
    newArray.sort((a, b) => {
      if (sort === 'old') {
        if (a.date < b.date) return 1;
        if (a.date === b.date) return 0;
        if (a.date > b.date) return -1;
      }
      if (sort === 'new') {
        if (a.date > b.date) return 1;
        if (a.date === b.date) return 0;
        if (a.date < b.date) return -1;
      }
    });
    return newArray;
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
      <Pagination setNowPage={setNowPage} nowPage={nowPage} tasks={displayTasks} paginationArray={paginationArray} limit={limit} />
    </div>
  );
}

export default App;
