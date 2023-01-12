import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getArrayTasks,
  createTask,
  removeTask,
  saveStateTask,
} from "../services/RequestApi";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async function (
    { filteringBy, sortingBy, taskLimitPerPage, currentPage },
    { rejectWithValue }
  ) {
    try {
      const data = await getArrayTasks({
        filteringBy,
        sortingBy,
        taskLimitPerPage,
        currentPage,
      });
      return data;
    } catch (error) {
      console.log("сработала ошибка в getTodos");
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async function ({ newTask }, { rejectWithValue }) {
    try {
      await createTask(newTask);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async function ({ id }, { rejectWithValue, dispatch }) {
    try {
      await removeTask(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkTodo = createAsyncThunk(
  "todos/checkTodo",
  async function ({ task }, { rejectWithValue }) {
    try {
      await saveStateTask(task);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    count: 0,
    loadingPage: false,
    errorTodo: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.loadingPage = true;
        state.errorTodo = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loadingPage = false;
        state.todos = action.payload.tasks;
        state.count = action.payload.count;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loadingPage = false;
        state.errorTodo = action.payload;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.loadingPage = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loadingPage = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loadingPage = false;
        state.errorTodo = action.payload;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingPage = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loadingPage = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loadingPage = false;
        state.errorTodo = action.payload;
      })
      .addCase(checkTodo.pending, (state, action) => {
        state.loadingPage = true;
      })
      .addCase(checkTodo.fulfilled, (state, action) => {
        state.loadingPage = false;
      })
      .addCase(checkTodo.rejected, (state, action) => {
        state.loadingPage = false;
        state.errorTodo = action.payload;
      });
  },
});

export default todoSlice.reducer;
