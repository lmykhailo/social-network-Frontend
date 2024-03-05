import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { IUserData } from '../../../types/IUserData'
import {
  createUser,
  getOneUser,
  getOneUserByUid,
  getOneUserByUsername,
  updateUser,
} from './userBackendActions'

interface AuthState {
  user: IUserData | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

function handleBackendThunk(
  builder: ActionReducerMapBuilder<AuthState>,
  thunk: any
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<IUserData>) => {
      state.loading = false
      state.user = action.payload
      state.error = null
    })
    .addCase(thunk.rejected, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    })
}

const userBackEndSlice = createSlice({
  name: 'userBackend',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleBackendThunk(builder, createUser)
    handleBackendThunk(builder, getOneUser)
    handleBackendThunk(builder, getOneUserByUid)
    handleBackendThunk(builder, getOneUserByUsername)
    handleBackendThunk(builder, updateUser)
  },
})

export default userBackEndSlice.reducer
