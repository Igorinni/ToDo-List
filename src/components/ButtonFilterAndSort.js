import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({filteringBy, handleFilteringBy, sortingBy, handleSortingBy}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={filteringBy === '' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringBy('')}>All</button></li>
          <li><button className={filteringBy === 'done' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringBy('done')}>Done</button></li>
          <li><button className={filteringBy === 'undone' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringBy('undone')}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={sortingBy === 'asc' ? "sortUp sortActive" : "sortUp"} onClick={() => handleSortingBy('asc')}><FaArrowCircleUp /></button></li>
          <li><button className={sortingBy === 'desc' ? "sortDown sortActive" : "sortDown"} onClick={() => handleSortingBy('desc')}><FaArrowCircleDown /></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
