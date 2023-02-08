import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, registration, deleteUser } from "../services/RequestAuth";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async function ({ candidate }, { rejectWithValue }) {
    try {
      const res = await login(candidate);
      return res;
    } catch (error) {
      console.log("error из ЛОГИНА: ", error);
      return rejectWithValue(
        error.response.data["errors"]
          ? error.response.data.errors[0].msg
          : error.response.data.message
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async function ({ candidate }, { rejectWithValue }) {
    try {
      const res = await registration(candidate);
      return res;
    } catch (error) {
      console.log("error из РЕГИСТРАЦИИ: ", error);
      return rejectWithValue(
        error.response.data["errors"]
          ? error.response.data.errors[0].msg
          : error.response.data.message
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async function ({str}, { rejectWithValue }) {
    try {
      const res = await deleteUser(localStorage.getItem("userId"));
      return res;
    } catch (error) {
      console.log("error из УДАЛЕНИЯ: ", error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loadingAuth: false,
    errorAuth: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingAuth = false;
        console.log("логин action :::::::::", action);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("userId", action.payload.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("ошиб лог action ------- ", action);
        state.loadingAuth = false;
        state.errorAuth = action.payload;
      })

      .addCase(registerUser.pending, (state, action) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loadingAuth = false;
        console.log("регистр action ------- ", action);
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("userId", action.payload.userId);
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("ошиб рег action ------- ", action);
        state.loadingAuth = false;
        state.errorAuth = action.payload;
      })

      .addCase(deleteAccount.pending, (state, action) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loadingAuth = false;
        console.log("удал action ------- ", action);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        console.log("ошиб удал action ------- ", action);
        state.loadingAuth = false;
        state.errorAuth = action.payload;
      });
  },
});

export default userSlice.reducer;
