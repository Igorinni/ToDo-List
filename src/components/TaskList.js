import Task from "./Task";

function TaskList({displayTasks, deleteTask, checkTask, totalTasks, controlChangeTask, setControlChangeTask}) {
    return (
      <div className="taskList">
        {displayTasks.length < 1 && <p className="taskZero">No tasks</p>}
        {displayTasks.map(elem => <Task task={elem} key={elem.id} deleteTask={deleteTask}
        checkTask={checkTask} totalTasks={totalTasks} controlChangeTask={controlChangeTask} setControlChangeTask={setControlChangeTask}></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  