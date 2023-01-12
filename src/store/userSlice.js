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
        loading: false,
        errorAuth: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.errorAuth = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log('loginUser action ::: ', action);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.errorAuth = action.payload;
            })

            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.errorAuth = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // console.log('registerUser action ::: ', action);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.errorAuth = action.payload;
            })
    }
})

export default userSlice.reducer;