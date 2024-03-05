import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import {
  signInUsingEmail,
  signInUsingGoogle,
  handleLogout,
  handleResetPassword,
  handleRegistration,
} from './authActions'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

function handleAuthThunk(
  builder: ActionReducerMapBuilder<AuthState>,
  thunk: any
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false
      state.user = action.payload
      state.error = null
    })
    .addCase(thunk.rejected, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    })
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAuthThunk(builder, signInUsingEmail)
    handleAuthThunk(builder, signInUsingGoogle)
    handleAuthThunk(builder, handleLogout)
    handleAuthThunk(builder, handleResetPassword)
    handleAuthThunk(builder, handleRegistration)
  },
})

export default authSlice.reducer
