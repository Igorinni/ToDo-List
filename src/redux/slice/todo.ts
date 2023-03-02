import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getArrayTasks,
  createTask,
  removeTask,
  saveStateTask,
  saveChangedTitleTask,
} from '../../services/RequestApi'
import { Task } from '../../general-types'

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async function (
    {
      filteringBy,
      sortingBy,
      taskLimitPerPage,
      currentPage,
    }: {
      filteringBy: string
      sortingBy: string
      taskLimitPerPage: number
      currentPage: number
    },
    { rejectWithValue }
  ) {
    try {
      const data = await getArrayTasks({
        filteringBy,
        sortingBy,
        taskLimitPerPage,
        currentPage,
      })
      return data
    } catch (error: any) {
      console.log('сработала ошибка в getTodos')
      return rejectWithValue(error.message)
    }
  }
)

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async function ({ newTask }: { newTask: Task }, { rejectWithValue }) {
    try {
      await createTask(newTask)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function ({ id }: { id: number }, { rejectWithValue }) {
    try {
      await removeTask(id)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const checkTodo = createAsyncThunk(
  'todos/checkTodo',
  async function ({ task }: { task: Task }, { rejectWithValue }) {
    try {
      await saveStateTask(task)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const saveChangeTaskTitle = createAsyncThunk(
  'todos/saveChangeTaskTitle',
  async function (
    { newValue, task }: { newValue: string; task: Task },
    { rejectWithValue }
  ) {
    try {
      await saveChangedTitleTask(newValue, task)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    count: 0,
    loadingPage: false,
    errorTodo: null,
  },
  reducers: {
    cleanerErrorTodo(state) {
      state.errorTodo = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.loadingPage = true
        state.errorTodo = null
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loadingPage = false
        state.todos = action.payload.tasks
        state.count = action.payload.count
      })
      .addCase(getTodos.rejected, (state, action: PayloadAction<any>) => {
        state.loadingPage = false
        state.errorTodo = action.payload
      })

      .addCase(addTodo.pending, (state, action) => {
        state.loadingPage = true
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loadingPage = false
      })
      .addCase(addTodo.rejected, (state, action: PayloadAction<any>) => {
        state.loadingPage = false
        state.errorTodo = action.payload
      })

      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingPage = true
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loadingPage = false
      })
      .addCase(deleteTodo.rejected, (state, action: PayloadAction<any>) => {
        state.loadingPage = false
        state.errorTodo = action.payload
      })

      .addCase(checkTodo.pending, (state, action) => {
        state.loadingPage = true
      })
      .addCase(checkTodo.fulfilled, (state, action) => {
        state.loadingPage = false
      })
      .addCase(checkTodo.rejected, (state, action: PayloadAction<any>) => {
        state.loadingPage = false
        state.errorTodo = action.payload
      })

      .addCase(saveChangeTaskTitle.pending, (state, action) => {
        state.loadingPage = true
      })
      .addCase(saveChangeTaskTitle.fulfilled, (state, action) => {
        state.loadingPage = false
      })
      .addCase(
        saveChangeTaskTitle.rejected,
        (state, action: PayloadAction<any>) => {
          state.loadingPage = false
          state.errorTodo = action.payload
        }
      )
  },
})

export default todoSlice.reducer
export const { cleanerErrorTodo } = todoSlice.actions
