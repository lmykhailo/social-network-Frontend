import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '../../../types/IUserData'

const baseUrl = 'http://localhost:8080'

export const createUser = createAsyncThunk(
  'userBackend/createUser',
  async (userData: IUserData, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error('Failed to create user')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'userBackend/updateUser',
  async ({ id, userData }: { id: number; userData: IUserData }, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      if (!response.ok) throw new Error('Failed to update user')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const getOneUser = createAsyncThunk(
  'user/getOneUser',
  async (id: number, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const getOneUserByUid = createAsyncThunk(
  'user/getOneUserByUid',
  async (uid: string, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/uid/${uid}`)
      if (!response.ok) throw new Error('Failed to fetch user by UID')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
export const getOneUserByUsername = createAsyncThunk(
  'user/getOneUserByUsername',
  async (username: string, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/username/${username}`)
      if (!response.ok) throw new Error('Failed to fetch user by username')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
