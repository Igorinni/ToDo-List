import Task from "./Task";

function TaskList({tasks, setTasks, deleteTask, checkTask, totalTasks}) {
    return (
      <div className="taskList">
        {tasks.length < 1 && <p className="taskZero">No tasks</p>}
        {tasks.map(elem => <Task task={elem} key={elem.id} deleteTask={deleteTask}
        checkTask={checkTask} tasks={tasks} setTasks={setTasks} totalTasks={totalTasks}></Task>)}
      </div>
    )
  }
  
  export default TaskList;
  