import Task from "./Task";

function TaskList({ tasksList, deleteTask, checkTask, getTasks, loadingPage }) {
  return (
    <div className="taskList">
      {tasksList.length <= 0 && <p className="noTasks">The list is empty</p>}
      {tasksList.map((elem) => (
        <Task
          task={elem}
          key={elem.uuid}
          deleteTask={deleteTask}
          checkTask={checkTask}
          getTasks={getTasks}
          loadingPage={loadingPage}
        />
      ))}
    </div>
  );
}

export default TaskList;
