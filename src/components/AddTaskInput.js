import { Box, Button, Flex, Input, transform } from "@chakra-ui/react";
import { useState } from "react";

function AddTaskInput({addTask, loadingPage}) {

  const [value, setValue] = useState('');
  const handleValueChange = (e) => setValue(e.target.value);


  function saveTask(){
    if (value.trim() === '') return;
    const date = new Date();
    const task = {
      name: value,
      done: false,
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
    }
    addTask(task)
    setValue('');
  }

  return (
    <Box w='100%' bg='white' borderRadius='7' m='1' p='1.5'>
      <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        
        <Input autoFocus value={value} onKeyUp={(e) => e.code === 'Enter' || e.key === 13 ? saveTask() : '' } 
          onChange={handleValueChange} 
          placeholder="Enter a task..."
          color="black" w='80%' fontSize='22' variant='unstyled' px='1'
        ></Input>
        
        <Button disabled={loadingPage} onClick={saveTask}
        fontSize='20' bg='rgb(113, 199, 192)' px='35' transitionDuration='300ms'
        isLoading={loadingPage && true} _hover={{transform: 'scale(1.1)'}}
        >Add</Button>

      </Flex>
    </Box>
    
  );
}

export default AddTaskInput;
