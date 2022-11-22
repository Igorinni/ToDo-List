import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({filterTasks, sort, sortTasks, valueFilter}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={valueFilter === '' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks('')}>All</button></li>
          <li><button className={valueFilter === 'done' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks('done')}>Done</button></li>
          <li><button className={valueFilter === 'undone' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks('undone')}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={sort == 'asc' ? "sortUp sortActive" : "sortUp"} onClick={() => sortTasks('asc')}><FaArrowCircleUp></FaArrowCircleUp></button></li>
          <li><button className={sort == 'desc' ? "sortDown sortActive" : "sortDown"} onClick={() => sortTasks('desc')}><FaArrowCircleDown></FaArrowCircleDown></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
