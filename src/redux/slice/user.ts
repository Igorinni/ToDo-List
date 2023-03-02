import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, registration, deleteUser } from '../../api/auth'
import { UserData } from '../../general-types'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function ({ userData }: { userData: UserData }, { rejectWithValue }) {
    try {
      const res = await login({userData})
      return res
    } catch (error: any) {
      console.log('error из ЛОГИНА: ', error)
      return rejectWithValue(
        error.response.data['errors']
          ? error.response.data.errors[0].msg
          : error.response.data.message
      )
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async function ({ userData }: { userData: UserData }, { rejectWithValue }) {
    try {
      const res = await registration({userData})
      return res
    } catch (error: any) {
      console.log('error из РЕГИСТРАЦИИ: ', error)
      return rejectWithValue(
        error.response.data['errors']
          ? error.response.data.errors[0].msg
          : error.response.data.message
      )
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async function ({ userId }: { userId: string }, { rejectWithValue }) {
    try {
      const res = await deleteUser({userId})
      return res
    } catch (error: any) {
      console.log('error из УДАЛЕНИЯ: ', error)
      return rejectWithValue(error.response.data.message)
    }
  }
)

const initialState = {
  loadingAuth: false,
  errorAuth: null,
  usernameAuth: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    cleanerLocal(state) {
      state.usernameAuth = initialState.usernameAuth
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
    },
    cleanerErrorUser(state) {
      state.errorAuth = null
    },
    setUsername(state) {
      const usernameStorage = localStorage.getItem('username')
      if (usernameStorage) {
        state.usernameAuth = usernameStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loadingAuth = true
        state.errorAuth = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.usernameAuth = action.payload.username
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
        localStorage.setItem('userId', action.payload.userId)
        state.loadingAuth = false
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAuth = false
        state.errorAuth = action.payload
      })

      .addCase(registerUser.pending, (state, action) => {
        state.loadingAuth = true
        state.errorAuth = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.usernameAuth = action.payload.username
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('username', action.payload.username)
        localStorage.setItem('userId', action.payload.userId)
        state.loadingAuth = false
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAuth = false
        state.errorAuth = action.payload
      })

      .addCase(deleteAccount.pending, (state, action) => {
        state.loadingAuth = true
        state.errorAuth = null
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        // userSlice.caseReducers.cleanerLocal(); - не получается
        state.loadingAuth = false
      })
      .addCase(deleteAccount.rejected, (state, action: PayloadAction<any>) => {
        state.loadingAuth = false
        state.errorAuth = action.payload
      })
  },
})

export default userSlice.reducer
export const { cleanerLocal, cleanerErrorUser, setUsername } = userSlice.actions
