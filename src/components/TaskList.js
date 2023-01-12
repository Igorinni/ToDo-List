import { Text } from "@chakra-ui/react";
import Task from "./Task";
import { saveChangedTitleTask } from "../services/RequestApi.js";
import { useSelector } from "react-redux";

function TaskList({
  deleteTask,
  checkTask,
  getTasks,
  setErrorText,
  usernameAuth
}) {
  
  const tasksList = useSelector(state => state.todos.todos)

  const saveChangedTitle = async (e, task) => {
    try {
      await saveChangedTitleTask(e.target.value, task);
      getTasks();
    } catch (error) {
      setErrorText(error.response.data.message);
    } 
  };

  return (
    <>
      {(!usernameAuth || tasksList.length <= 0) && (
        <Text
          m="50"
          color="rgb(56, 27, 102)"
          fontSize="26"
          fontStyle="italic"
          textDecoration="underline"
        >
          The list is empty
        </Text>
      )}

      {usernameAuth && tasksList.map((elem) => (
        <Task
          task={elem}
          key={elem.uuid}
          deleteTask={deleteTask}
          checkTask={checkTask}
          getTasks={getTasks}
          setErrorText={setErrorText}
          saveChangedTitle={saveChangedTitle}
        />
      ))}
    </>
  );
}

export default TaskList;
