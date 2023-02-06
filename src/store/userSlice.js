import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, registration } from "../services/RequestAuth";


export const loginUser = createAsyncThunk(
    "user/loginUser",
    async function ({ candidate }, {rejectWithValue}) {
        try {
            const res = await login(candidate);
            return res
          } catch (error) {
            console.log('error из ЛОГИНА: ', error);
            // error.response.data["errors"]
            //   ? rejectWithValue(error.response.data.errors[0].msg)
            //   : rejectWithValue(error.response.data.message);
          }
    }
)

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async function ({ candidate }, {rejectWithValue}) {
        try {
            const res = await registration(candidate);
            return res
          } catch (error) {
            // console.log('error из РЕГИСТРАЦИИ: ', error);
            rejectWithValue(error.response.data.errors[0].msg)
            // error.response.data["errors"]
            //   ? rejectWithValue(error.response.data.errors[0].msg)
            //   : rejectWithValue(error.response.data.message);
          }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        loadingAuth: false,
        errorAuth: null,
        token: null,
        username: null,
        userId: null,
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
                // console.log('loginUser action ::: ', action);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loadingAuth = false;
                state.errorAuth = action.payload;
            })

            .addCase(registerUser.pending, (state, action) => {
                state.loadingAuth = true;
                state.errorAuth = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loadingAuth = false;
                console.log(action);
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.userId = action.payload.userId;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loadingAuth = false;
                state.errorAuth = action.payload;
            })
    }
})

export default userSlice.reducer;