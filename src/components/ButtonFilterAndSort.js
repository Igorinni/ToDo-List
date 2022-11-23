import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({valueToFilter, handleValueToFilter, valueToSort, handleValueToSort}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={valueToFilter === '' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter('')}>All</button></li>
          <li><button className={valueToFilter === 'done' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter('done')}>Done</button></li>
          <li><button className={valueToFilter === 'undone' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter('undone')}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={valueToSort === 'asc' ? "sortUp sortActive" : "sortUp"} onClick={() => handleValueToSort('asc')}><FaArrowCircleUp /></button></li>
          <li><button className={valueToSort === 'desc' ? "sortDown sortActive" : "sortDown"} onClick={() => handleValueToSort('desc')}><FaArrowCircleDown /></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
