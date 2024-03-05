import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { IMessageData } from '../../../types/IMessageData'
import {
  createMessage,
  fetchPaginatedMessages,
  getMessages,
} from './messagesActions'

interface MessageState {
  messages: IMessageData[] | null
  currentChatId: number | null
  loading: boolean
  error: string | null
}

const initialState: MessageState = {
  messages: null,
  currentChatId: null,
  loading: false,
  error: null,
}

function handleMessagesThunk(
  builder: ActionReducerMapBuilder<MessageState>,
  thunk: any
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(
      thunk.fulfilled,
      (state, action: PayloadAction<IMessageData[]>) => {
        state.loading = false
        state.messages = action.payload
        state.error = null
      }
    )
    .addCase(thunk.rejected, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    })
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setCurrentChatId: (state, action: PayloadAction<number>) => {
      state.currentChatId = action.payload
    },
    addMessage: (state, action: PayloadAction<IMessageData>) => {
      state.messages = state.messages
        ? [action.payload, ...state.messages]
        : [action.payload]
    },
    resetMessages: (state) => {
      state.messages = null
    },
  },
  extraReducers: (builder) => {
    handleMessagesThunk(builder, createMessage)
    handleMessagesThunk(builder, fetchPaginatedMessages)
    handleMessagesThunk(builder, getMessages)
  },
})

export const { setCurrentChatId, addMessage, resetMessages } =
  messagesSlice.actions

export default messagesSlice.reducer
