import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit'
import {
  checkUserFollow,
  fetchFollowCounts,
  followUser,
  unfollowUser,
} from './followingActions'

interface FollowState {
  followStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  isFollowing: boolean
  error: string | null
  followingCount: number
  followerCount: number
}

const initialState: FollowState = {
  followStatus: 'idle',
  isFollowing: false,
  error: null,
  followerCount: -1,
  followingCount: -1,
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.followStatus = 'loading'
      })
      .addCase(followUser.fulfilled, (state) => {
        state.followStatus = 'succeeded'
        state.isFollowing = true
      })
      .addCase(followUser.rejected, (state, action) => {
        state.followStatus = 'failed'
        state.error = action.error.message ?? 'Failed to follow'
      })
      .addCase(unfollowUser.pending, (state) => {
        state.followStatus = 'loading'
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.followStatus = 'succeeded'
        state.isFollowing = false
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.followStatus = 'failed'
        state.error = action.error.message ?? 'Failed to unfollow'
      })
      .addCase(
        checkUserFollow.fulfilled,
        (state, action: PayloadAction<{ isFollowing: boolean }>) => {
          state.isFollowing = action.payload.isFollowing
        }
      )
      .addCase(checkUserFollow.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to check'
      })
      .addCase(
        fetchFollowCounts.fulfilled,
        (
          state,
          action: PayloadAction<{
            followerCount: number
            followingCount: number
          }>
        ) => {
          state.followerCount = action.payload.followerCount
          state.followingCount = action.payload.followingCount
        }
      )
  },
})

export default followSlice.reducer
