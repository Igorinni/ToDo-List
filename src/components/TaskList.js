import { Text } from "@chakra-ui/react";
import Task from "./Task";
import { useSelector } from "react-redux";

function TaskList({
  deleteTask,
  checkTask,
  getTasks,
  setErrorText,
  saveChangedTitle,
}) {
  const tasksList = useSelector((state) => state.todos.todos);
  const { usernameAuth } = useSelector((state) => state.user);

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

      {usernameAuth &&
        tasksList.map((elem) => (
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
