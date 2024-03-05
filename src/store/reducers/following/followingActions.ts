import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:8080'

export const followUser = createAsyncThunk(
  'follow/followUser',
  async (
    {
      follower_uid,
      following_uid,
    }: { follower_uid: string; following_uid: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(`${baseUrl}/api/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ follower_uid, following_uid }),
      })
      if (!response.ok) throw new Error('Failed to follow')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const checkUserFollow = createAsyncThunk(
  'follow/checkUserFollow',
  async (
    {
      follower_uid,
      following_uid,
    }: { follower_uid: string; following_uid: string },
    thunkAPI
  ) => {
    try {
      const queryParams = new URLSearchParams({
        follower_uid,
        following_uid,
      }).toString()
      const response = await fetch(
        `${baseUrl}/api/check-follow?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error('Failed to check')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const unfollowUser = createAsyncThunk(
  'follow/unfollowUser',
  async (
    {
      follower_uid,
      following_uid,
    }: { follower_uid: string; following_uid: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(`${baseUrl}/api/unfollow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ follower_uid, following_uid }),
      })
      if (!response.ok) throw new Error('Failed to unfollow')
      return
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

export const fetchFollowCounts = createAsyncThunk(
  'follow/fetchFollowCounts',
  async ({ uid }: { uid: string }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams({
        uid,
      }).toString()
      const response = await fetch(
        `${baseUrl}/api/check-follower-count?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error('Failed to check')
      return await response.json()
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)
