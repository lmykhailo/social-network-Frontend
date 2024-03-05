import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'
import { getNotifications } from './notificationsActions'

interface NotificationsState {
  notificationsCount: number
  unreadChats: number[]
  loading: boolean
  error: string | null
}

const initialState: NotificationsState = {
  notificationsCount: 0,
  unreadChats: [],
  loading: false,
  error: null,
}

function handleNotificationsThunk(
  builder: ActionReducerMapBuilder<NotificationsState>,
  thunk: any
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.notificationsCount = action.payload.notificationsCount
      state.unreadChats = action.payload.chatIds
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markChatAsRead: (state, action: PayloadAction<number>) => {
      const index = state.unreadChats.indexOf(action.payload)
      if (index > -1) {
        state.unreadChats.splice(index, 1)
        state.notificationsCount = Math.max(0, state.notificationsCount - 1)
      }
    },
  },
  extraReducers: (builder) => {
    handleNotificationsThunk(builder, getNotifications)
  },
})

export const { markChatAsRead } = notificationsSlice.actions
export default notificationsSlice.reducer
