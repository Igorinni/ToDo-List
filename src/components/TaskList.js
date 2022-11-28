import { Text } from "@chakra-ui/react";
import Task from "./Task";

function TaskList({tasksList, deleteTask, checkTask, getTasks, loadingPage}) {  
 
    return (
      <>
        {tasksList.length <= 0 && 
        <Text m='50' color='rgb(56, 27, 102)' fontSize='26' fontStyle='italic' textDecoration='underline'
        >The list is empty</Text>}

        {tasksList.map(elem => <Task task={elem} key={elem.uuid} deleteTask={deleteTask} checkTask={checkTask} getTasks={getTasks} loadingPage={loadingPage} />)}
      </>
    )
  }
  
  export default TaskList;
  