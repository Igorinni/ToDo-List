import { Text } from "@chakra-ui/react";
import Task from "./Task";
import { saveСhangedTitleTask } from "../services/RequestApi.js";

function TaskList({
  tasksList,
  deleteTask,
  checkTask,
  getTasks,
  loadingPage,
  handleLoadingPage,
  setErrorText,
}) {
  
  const saveСhangedTitle = async (e, task) => {
    try {
      handleLoadingPage(true);
      await saveСhangedTitleTask(e.target.value, task);
      getTasks();
    } catch (error) {
      setErrorText(error.response.data.message);
    } finally {
      handleLoadingPage(false);
    }
  };

  return (
    <>
      {tasksList.length <= 0 && (
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

      {tasksList.map((elem) => (
        <Task
          task={elem}
          key={elem.uuid}
          deleteTask={deleteTask}
          checkTask={checkTask}
          getTasks={getTasks}
          loadingPage={loadingPage}
          setErrorText={setErrorText}
          saveСhangedTitle={saveСhangedTitle}
        />
      ))}
    </>
  );
}

export default TaskList;
