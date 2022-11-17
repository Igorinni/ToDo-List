import Task from "./Task";

function TaskList({tasks, deleteTask, checkTask}) {
    return (
      <div className="taskList">
        {tasks.length < 1 && <p className="taskZero">Task list is empty</p>}
        {tasks.map(elem => <Task task={elem} key={elem.id} deleteTask={deleteTask}
        checkTask={checkTask}></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  