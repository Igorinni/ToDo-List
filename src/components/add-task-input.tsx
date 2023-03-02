import React, { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../hooks/redux'
import { Box, Button, Flex, Input, useMediaQuery } from '@chakra-ui/react'
import { Task } from './../general-types'

function AddTaskInput({ addTask }: { addTask: (task: Task) => void }) {
  const { loadingPage } = useAppSelector((state) => state.todos)

  const [value, setValue] = useState('')
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const inputRef: React.RefObject<HTMLInputElement> = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [loadingPage])

  function saveTask() {
    if (value.trim() === '') return
    const date = new Date()
    const task = {
      name: value,
      done: false,
      createdAt: date.getTime(),
      updatedAt: date.getTime(),
    }
    addTask(task)
    setValue('')
  }

  const [isLessThan550] = useMediaQuery('(max-width: 665px)')

  return (
    <Box w='100%' bg='white' borderRadius='7' m='1' p='1.5'>
      <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        <Input
          ref={inputRef}
          value={value}
          onKeyDown={(e) =>
            (e.code === 'Enter' || e.key === '13') && saveTask()
          }
          onChange={handleValueChange}
          isDisabled={loadingPage}
          placeholder='Enter a task...'
          color='black'
          w='80%'
          fontSize='22'
          variant='unstyled'
          px='1'
        ></Input>

        <Button
          disabled={loadingPage}
          onClick={saveTask}
          fontSize='20'
          bg='rgb(113, 199, 192)'
          px='35'
          transitionDuration='300ms'
          _hover={{ transform: 'scale(1.1)' }}
          width={isLessThan550 ? '100%' : 'none'}
        >
          Add
        </Button>
      </Flex>
    </Box>
  )
}

export default AddTaskInput
