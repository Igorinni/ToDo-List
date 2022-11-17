
function Pages({displayTask, page, pageNumbers}) {

  return (
    <ul className="paginationButtons">
      <li><button onClick={() => displayTask("Left")}>&#60;&#60;</button></li>
      {
        pageNumbers.map(number => (
          <li key={number} className={page == number ? "activePage" : ""}>< button onClick={() => displayTask(number)}> {number} </button></li>
        ))
      }
      <li><button onClick={() => displayTask("Right")}>&#62;&#62;</button></li>
    </ul>
  );
}

export default Pages;
