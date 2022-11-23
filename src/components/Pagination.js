import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({setСurrentPage, currentPage, arrayToDisplayTasks, paginationArray, taskLimitPerPage}) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(paginationArray.length / taskLimitPerPage); i++) {
    pageNumbers.push(i)
  }

  function goToPage(result){
  
    if (result === "Left") {
      (currentPage === 1) ? setСurrentPage(currentPage) : setСurrentPage(currentPage - 1)
    } else if (result === "Right") {
      (currentPage === pageNumbers.length) ? setСurrentPage(currentPage) : setСurrentPage(currentPage + 1)
    } else {
      setСurrentPage(result)
    }
    
  }  
 
  return (
    arrayToDisplayTasks.length == 0 ? ' ' :
    <div className="paginationButtons">
      {currentPage >= 2 && <button className="buttonPaginationArrow" onClick={() => goToPage("Left")}><IoIosArrowBack /></button>}
      {currentPage > 2 && <button className={1 === currentPage ? "buttonPagination activePage" : "buttonPagination"} key={1}
          onClick={() => goToPage(1)}>{1}</button>}
      {currentPage > 3 && <button className="buttonPaginationPoints">...</button>}

      {pageNumbers.map((item) => {
        
        if (item === currentPage || item === currentPage - 1 || item === currentPage + 1) {
          return (
          <button className={item === currentPage ? "buttonPagination activePage" : "buttonPagination"} key={item}
          onClick={() => goToPage(item)}
          >{item}</button>)}
        return null;

      })}

      {currentPage < pageNumbers.length - 2 && <button className="buttonPaginationPoints">...</button>}
      {currentPage < pageNumbers.length - 1 && <button className={pageNumbers.length === currentPage ? "buttonPagination activePage" : "buttonPagination"} key={pageNumbers.length}
          onClick={() => goToPage(pageNumbers.length)}>{pageNumbers.length}</button>}
      {currentPage < pageNumbers.length && <button className="buttonPaginationArrow" onClick={() => goToPage("Right")}><IoIosArrowForward /></button>}
    </div>
    
  );
}

export default Pagination;
