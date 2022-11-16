import { useEffect, useState } from "react";

function Pages({tasks, setActualTasks}) {
  
  const [page, setPage] = useState(1);
  const [limit] = useState(5)

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tasks.length / limit); i++) {
    pageNumbers.push(i)
  }

  const lastTask = limit * page;
  const firstTask = lastTask - limit;


  function displayTask(num){
    setPage(num);
  }

  useEffect( () => {
    const displayTasks = tasks.slice(firstTask, lastTask)
    setActualTasks(displayTasks)
  }, [page])

  return (
    <ul className="paginationButtons">
      {
        pageNumbers.map(number => (
          <li key={number} onClick={() => displayTask(number)}>{number}</li>
        ))
      }
    </ul>
  );
}

export default Pages;
