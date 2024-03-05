import { createAsyncThunk } from '@reduxjs/toolkit'
import { IChatData } from '../../../types/IChatData'

const baseUrl = 'http://localhost:8080'

export const createChat = createAsyncThunk(
  'chats/createChat',
  async (chatData: { user1_uid: string; user2_uid: string }, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/chats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatData),
      })
      if (!response.ok) throw new Error('Failed to create chat')

      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const getChats = createAsyncThunk(
  'chats/getChats',
  async (uid: string, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/chats/${uid}`)
      if (!response.ok) throw new Error('Failed to fetch chats')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
