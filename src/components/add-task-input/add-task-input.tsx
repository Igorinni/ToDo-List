import React, { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useMediaQuery } from '@chakra-ui/react'
import { CreateTask } from './../../general-types'
import { AddBottom, AddInput, Container } from './add-input.styled'

function AddTaskInput({ addTask }: { addTask: (task: CreateTask) => void }) {
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
    <Container>
      <AddInput
        ref={inputRef}
        value={value}
        onKeyDown={(e) => (e.code === 'Enter' || e.key === '13') && saveTask()}
        onChange={handleValueChange}
        disabled={loadingPage}
        placeholder='Enter a task...'
      />

      <AddBottom
        isLessThan550={isLessThan550}
        disabled={loadingPage}
        onClick={saveTask}
      >
        Add
      </AddBottom>
    </Container>
  )
}

export default AddTaskInput
