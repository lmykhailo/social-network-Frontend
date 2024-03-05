import { createAsyncThunk } from '@reduxjs/toolkit'

import { IMessageData } from '../../../types/IMessageData'
import { RootState } from '../../store'

const baseUrl = 'http://localhost:8080'

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (messageData: IMessageData, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const chat_id = state.messages.currentChatId

    try {
      const postResponse = await fetch(`${baseUrl}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      })

      if (!postResponse.ok) throw new Error('Failed to create message')

      const fetchResponse = await fetch(`${baseUrl}/api/messages/${chat_id}`)
      if (!fetchResponse.ok) throw new Error('Failed to fetch messages')

      return await fetchResponse.json()
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const chat_id = state.messages.currentChatId

    if (chat_id === null) {
      return rejectWithValue('No chat selected')
    }

    try {
      const response = await fetch(`${baseUrl}/api/messages/${chat_id}`)
      if (!response.ok) throw new Error('Failed to fetch messages')
      return await response.json()
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
export const fetchPaginatedMessages = createAsyncThunk(
  'messages/fetchPaginated',
  async ({ limit }: { limit: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const chat_id = state.messages.currentChatId

    if (chat_id === null) {
      return rejectWithValue('No chat selected')
    }
    try {
      const response = await fetch(
        `${baseUrl}/api/messages/${chat_id}?limit=${limit}`
      )
      if (!response.ok) throw new Error('Failed to fetch messages')
      return await response.json()
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
