import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({filterTasks, sort, sortTasks, valueFilter}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={valueFilter === 'All' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks('All')}>All</button></li>
          <li><button className={valueFilter === true ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks(true)}>Done</button></li>
          <li><button className={valueFilter === false ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => filterTasks(false)}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={sort == 'new' ? "sortUp sortActive" : "sortUp"} onClick={() => sortTasks('new')}><FaArrowCircleUp></FaArrowCircleUp></button></li>
          <li><button className={sort == 'old' ? "sortDown sortActive" : "sortDown"} onClick={() => sortTasks('old')}><FaArrowCircleDown></FaArrowCircleDown></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
