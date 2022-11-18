
function Pagination({setNowPage, nowPage, pageNumbers, tasks}) {

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
      {nowPage >= 2 && <button className="buttonPagination" onClick={() => goToPage("Left")}>&#60;&#60;</button>}
      {pageNumbers.map((item) => {
        
        if (item === nowPage || item === nowPage - 1 || item === nowPage + 1) {
          return (
          <button className={item === nowPage ? "buttonPagination activePage" : "buttonPagination"} key={item}
          onClick={() => goToPage(item)}
          >{item}</button>)}
        return null;
      })}
      {nowPage < pageNumbers.length && <button className="buttonPagination" onClick={() => goToPage("Right")}>&#62;&#62;</button>}
    </div>
    
  );
}

export default Pagination;
