import { createAsyncThunk } from '@reduxjs/toolkit'
import { IChatDataWithUserDetails } from '../../../types/IChatDataWithUserDetails'
import { IUserDetails } from '../../../types/IUserDetails'

const baseUrl = 'http://localhost:8080'

export const fetchChatsAndUserDetails = createAsyncThunk(
  'chatUserDetails/fetchChatsAndUserDetails',
  async (uid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/api/chats-with-info/${uid}`)
      if (!response.ok) {
        throw new Error('Could not fetch chats')
      }
      const chatsWithDetails: IChatDataWithUserDetails[] = await response.json()

      const userDetailsByChatId: Record<number, IUserDetails | undefined> = {}
      chatsWithDetails.forEach((chat) => {
        userDetailsByChatId[chat.chat_id] = chat.other_user_details
      })

      return userDetailsByChatId
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unexpected error occurred')
    }
  }
)
