import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({handleValueToFilter, valueToSort, handleValueToSort, valueToFilter}) {
  return (
    <div className="filterAndSort">
        <ul className="boxFilterButtons">
          <li><button className={valueToFilter === 'All' ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter('All')}>All</button></li>
          <li><button className={valueToFilter === true ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter(true)}>Done</button></li>
          <li><button className={valueToFilter === false ? "buttonFilter activeButtonFilter" : "buttonFilter"} onClick={() => handleValueToFilter(false)}>Undone</button></li>
        </ul>
        <ul className="sortTask">
          <li>Sort by Date</li>
          <li><button className={valueToSort === 'new' ? "sortUp sortActive" : "sortUp"} onClick={() => handleValueToSort('new')}><FaArrowCircleUp></FaArrowCircleUp></button></li>
          <li><button className={valueToSort === 'old' ? "sortDown sortActive" : "sortDown"} onClick={() => handleValueToSort('old')}><FaArrowCircleDown></FaArrowCircleDown></button></li>
        </ul>
      </div>
  );
}

export default ButtonFilterAndSort;
