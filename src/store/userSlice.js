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
  async function ({ userIdNow }, { rejectWithValue }) {
    try {
      const res = await deleteUser(userIdNow);
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
    usernameAuth: localStorage.getItem("username") || null,
  },
  reducers: {
    cleanerLocal(state) {
      state.usernameAuth = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
    },
    cleanerErrorUser(state) {
      state.errorAuth = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.usernameAuth = action.payload.username;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("userId", action.payload.userId);
        state.loadingAuth = false;
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
        state.usernameAuth = action.payload.username;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
        localStorage.setItem("userId", action.payload.userId);
        state.loadingAuth = false;
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
        userSlice.caseReducers.cleanerLocal();
        state.loadingAuth = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        console.log("ошиб удал action ------- ", action);
        state.loadingAuth = false;
        state.errorAuth = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { cleanerLocal, cleanerErrorUser } = userSlice.actions;
