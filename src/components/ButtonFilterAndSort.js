import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({filteringValue, handleFilteringValue, sortingValue, handleSortingValue}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={filteringValue === '' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringValue('')}>All</button></li>
          <li><button className={filteringValue === 'done' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringValue('done')}>Done</button></li>
          <li><button className={filteringValue === 'undone' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleFilteringValue('undone')}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={sortingValue === 'asc' ? "sortUp sortActive" : "sortUp"} onClick={() => handleSortingValue('asc')}><FaArrowCircleUp /></button></li>
          <li><button className={sortingValue === 'desc' ? "sortDown sortActive" : "sortDown"} onClick={() => handleSortingValue('desc')}><FaArrowCircleDown /></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
