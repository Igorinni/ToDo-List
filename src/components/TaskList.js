import Task from "./Task";

function TaskList({tasks}) {
    return (
      <div className="taskList">
        {tasks.map(elem => <Task task={elem} key={elem.id}></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  