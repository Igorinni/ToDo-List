import Header from "./components/Header";
import AddTaskInput from "./components/AddTaskInput";
import TaskList from "./components/TaskList";
import { useMemo, useState } from "react";
import ButtonFilterAndSort from "./components/ButtonFilterAndSort";
import Pagination from "./components/Pagination";

function App() {
  
  const [tasks, setTasks] = useState([]);
  const handleTaskChange = (value) => { setTasks(value) };

  const [currentPage, setСurrentPage] = useState(1);
  const taskLimitPerPage = 5;
  const [paginationArray, setPaginationArray] = useState(tasks);
  const [valueToFilter, setValueToFilter] = useState('All');
  const handleValueToFilter = (value) => {
    setValueToFilter(value);
    setСurrentPage(1);
  }
  const [valueToSort, setValueToSort] = useState('old');
  const handleValueToSort = (value) => setValueToSort(value)

  
  const arrayToDisplayTasks = useMemo(() => {
    const lastTask = taskLimitPerPage * currentPage;
    const firstTask = lastTask - taskLimitPerPage;
    let displayTasks = [];

    if (valueToFilter === 'All') {
      
      displayTasks = sortingArray(tasks).slice(firstTask, lastTask);
      setPaginationArray(tasks);

    } else {

      const array = [...tasks].filter(elem => elem.completed === valueToFilter);
      displayTasks = sortingArray(array).slice(firstTask, lastTask);
      setPaginationArray(array);

    }

    return displayTasks;
  }, [tasks, currentPage, valueToFilter, valueToSort])


  const deleteTask = (id) => {
    const newTasks = [...tasks].filter(elem => elem.id !== id);
    setTasks(newTasks);
  }

  const checkTask = (id) => {
    const newTasks = [...tasks];
    newTasks.forEach(elem => elem.id === id && (elem.completed = !elem.completed));
    setTasks(newTasks);
  }

  function sortingArray(array) {
    const newArray = [...array];
    newArray.sort((a, b) => {
      if (valueToSort === 'old') {
        if (a.date < b.date) return 1;
        if (a.date === b.date) return 0;
        if (a.date > b.date) return -1;
      }
      if (valueToSort === 'new') {
        if (a.date > b.date) return 1;
        if (a.date === b.date) return 0;
        if (a.date < b.date) return -1;
      }
    });
    return newArray;
  }

  if (arrayToDisplayTasks == 0 && currentPage > 1) {
    setСurrentPage(currentPage - 1);
  }

  return (
    <div className="App">
      <Header />
      <AddTaskInput tasks={tasks} handleTaskChange={handleTaskChange} />
      <ButtonFilterAndSort handleValueToFilter={handleValueToFilter} valueToSort={valueToSort} handleValueToSort={handleValueToSort} valueToFilter={valueToFilter} />
      <TaskList arrayToDisplayTasks={arrayToDisplayTasks} deleteTask={deleteTask} checkTask={checkTask} />
      <Pagination setСurrentPage={setСurrentPage} currentPage={currentPage} arrayToDisplayTasks={arrayToDisplayTasks} paginationArray={paginationArray} taskLimitPerPage={taskLimitPerPage} />
    </div>
  );
}

export default App;
