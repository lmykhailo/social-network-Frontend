import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatDataWithUserDetails } from '../../../types/IChatDataWithUserDetails'
import { RootState } from '../../store'
import { IUserDetails } from '../../../types/IUserDetails'
import { fetchChatsAndUserDetails } from './chatUserDetailsActions'

interface ChatUserDetailsState {
  userDetailsByChatId: Record<number, IUserDetails | undefined>
}

const initialState: ChatUserDetailsState = {
  userDetailsByChatId: {},
}

const chatUserDetailsSlice = createSlice({
  name: 'chatUserDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchChatsAndUserDetails.fulfilled,
      (
        state,
        action: PayloadAction<Record<number, IUserDetails | undefined>>
      ) => {
        state.userDetailsByChatId = action.payload
      }
    )
  },
})

export const selectUserDetailsByChatId = (
  state: RootState,
  chatId: number
): IUserDetails | undefined => state.chatUserDetails.userDetailsByChatId[chatId]

export default chatUserDetailsSlice.reducer
