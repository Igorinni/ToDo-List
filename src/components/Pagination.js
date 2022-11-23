import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Pagination({setNowPage, nowPage, tasks, paginationArray, limit}) {

  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(paginationArray.length / limit); i++) {
    pageNumbers.push(i)
  }

  function goToPage(result){
  
    if (result === "Left") {
      (nowPage === 1) ? setNowPage(nowPage) : setNowPage(nowPage - 1)
    } else if (result === "Right") {
      (nowPage === pageNumbers.length) ? setNowPage(nowPage) : setNowPage(nowPage + 1)
    } else {
      setNowPage(result)
    }
    
  }  
 
  return (
    tasks.length == 0 ? ' ' :
    <div className="paginationButtons">
      {nowPage >= 2 && <button className="buttonPaginationArrow" onClick={() => goToPage("Left")}><IoIosArrowBack /></button>}
      {nowPage > 2 && <button className={1 === nowPage ? "buttonPagination activePage" : "buttonPagination"} key={1}
          onClick={() => goToPage(1)}>{1}</button>}
      {nowPage > 3 && <button className="buttonPaginationPoints">...</button>}

      {pageNumbers.map((item) => {
        
        if (item === nowPage || item === nowPage - 1 || item === nowPage + 1) {
          return (
          <button className={item === nowPage ? "buttonPagination activePage" : "buttonPagination"} key={item}
          onClick={() => goToPage(item)}
          >{item}</button>)}
        return null;

      })}

      {nowPage < pageNumbers.length - 2 && <button className="buttonPaginationPoints">...</button>}
      {nowPage < pageNumbers.length - 1 && <button className={pageNumbers.length === nowPage ? "buttonPagination activePage" : "buttonPagination"} key={pageNumbers.length}
          onClick={() => goToPage(pageNumbers.length)}>{pageNumbers.length}</button>}
      {nowPage < pageNumbers.length && <button className="buttonPaginationArrow" onClick={() => goToPage("Right")}><IoIosArrowForward /></button>}
    </div>
    
  );
}

export default Pagination;
