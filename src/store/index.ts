import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo-slice.ts";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});
