import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from '../../../functions/getAnotherUserUid'

export const getNotifications = createAsyncThunk(
  'chats/notifications',
  async (uid: string, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/chats/notifications/${uid}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
