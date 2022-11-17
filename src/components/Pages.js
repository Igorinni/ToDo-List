
function Pages({goToPage, page, pageNumbers}) {

  return (
    <ul className="paginationButtons">
      <li><button onClick={() => goToPage("Left")}>&#60;&#60;</button></li>
      {
        pageNumbers.map(number => (
          <li key={number} className={page == number ? "activePage" : ""}>< button onClick={() => goToPage(number)}> {number} </button></li>
        ))
      }
      <li><button onClick={() => goToPage("Right")}>&#62;&#62;</button></li>
    </ul>
  );
}

export default Pages;
