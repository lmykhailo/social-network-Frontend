import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { IChatData } from '../../../types/IChatData'
import { createChat, getChats } from './chatsActions'
import { chatExists } from '../../../functions/chatExists'

interface ChatState {
  chats: IChatData[] | null
  loading: boolean
  error: string | null
}

const initialState: ChatState = {
  chats: null,
  loading: false,
  error: null,
}

function handleChatsThunk(
  builder: ActionReducerMapBuilder<ChatState>,
  thunk: any
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<IChatData[]>) => {
      state.loading = false
      state.chats = action.payload
      state.error = null
    })
    .addCase(thunk.rejected, (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    })
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<IChatData>) => {
      if (!state.chats) {
        state.chats = [action.payload]
      } else if (!chatExists(state.chats, action.payload)) {
        state.chats.push(action.payload)
      }
    },
    removeChatReadStatus: (
      state,
      action: PayloadAction<{ chat_id: number; user_uid: string }>
    ) => {
      const { chat_id, user_uid } = action.payload
      const chat = state.chats?.find((c) => c.chat_id === chat_id)
      if (chat) {
        if (chat.user1_uid === user_uid) {
          chat.user1_read = true
        } else if (chat.user2_uid === user_uid) {
          chat.user2_read = true
        }
      }
    },
  },
  extraReducers: (builder) => {
    handleChatsThunk(builder, getChats)
  },
})

export const { addChat, removeChatReadStatus } = chatsSlice.actions
export default chatsSlice.reducer
