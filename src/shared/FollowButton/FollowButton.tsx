import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  unfollowUser,
  followUser,
  checkUserFollow,
  fetchFollowCounts,
} from '../../store/reducers/following/followingActions'

interface FollowButtonInterface {
  following_uid: string
}

const FollowButton = ({ following_uid }: FollowButtonInterface) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { isFollowing } = useAppSelector((state) => state.following)

  useEffect(() => {
    if (user && following_uid) {
      dispatch(checkUserFollow({ follower_uid: user.uid, following_uid }))
    }
  }, [following_uid, user])

  useEffect(() => {
    dispatch(fetchFollowCounts({ uid: following_uid }))
  }, [isFollowing])

  const handleFollow = () => {
    if (user) {
      if (isFollowing) {
        dispatch(unfollowUser({ follower_uid: user?.uid, following_uid }))
      } else {
        dispatch(followUser({ follower_uid: user?.uid, following_uid }))
      }
    }
  }

  return (
    <>
      <button
        className="rounded-lg bg-gray-400 px-4 py-1.5 text-sm  hover:bg-gray-500 hover:bg-opacity-30 
      dark:bg-slate-800 dark:text-white dark:hover:bg-indigo-800 dark:hover:bg-opacity-30"
        onClick={handleFollow}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </>
  )
}

export default FollowButton
