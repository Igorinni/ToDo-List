import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

function ButtonFilterAndSort({
  filteringBy,
  handleFilteringBy,
  sortingBy,
  handleSortingBy,
}) {
  return (
    <div className="filterAndSort">
      <ul className="boxFilterButtons">
        <li>
          <button
            className={
              filteringBy === ""
                ? "buttonFilter activeButtonFilter"
                : "buttonFilter"
            }
            onClick={() => handleFilteringBy("")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={
              filteringBy === "done"
                ? "buttonFilter activeButtonFilter"
                : "buttonFilter"
            }
            onClick={() => handleFilteringBy("done")}
          >
            Done
          </button>
        </li>
        <li>
          <button
            className={
              filteringBy === "undone"
                ? "buttonFilter activeButtonFilter"
                : "buttonFilter"
            }
            onClick={() => handleFilteringBy("undone")}
          >
            Undone
          </button>
        </li>
      </ul>
      <button
        className="sortTask"
        onClick={() =>
          sortingBy === "desc"
            ? handleSortingBy("asc")
            : handleSortingBy("desc")
        }
      >
        <p>Sort by Date</p>
        <FaArrowCircleUp
          className={sortingBy === "asc" ? "sortUp sortActive" : "sortUp"}
        />
        <FaArrowCircleDown
          className={sortingBy === "desc" ? "sortDown sortActive" : "sortDown"}
        />
      </button>
    </div>
  );
}

export default ButtonFilterAndSort;
