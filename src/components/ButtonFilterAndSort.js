import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({displayActualTasks, sortTasks}) {
  return (
    <div className="filterAndSort">
        <ul className="filterTasks">
          <li><button onClick={() => displayActualTasks('All')}>All</button></li>
          <li><button onClick={() => displayActualTasks(true)}>Done</button></li>
          <li><button onClick={() => displayActualTasks(false)}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className="sortUp" onClick={() => sortTasks('old')}><FaArrowCircleUp></FaArrowCircleUp></button></li>
          <li><button className="sortDown" onClick={() => sortTasks('new')}><FaArrowCircleDown></FaArrowCircleDown></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
