import { useAppSelector } from '../../hooks/redux'

const ProfileFollowBlock = () => {
  const { followerCount, followingCount } = useAppSelector(
    (state) => state.following
  )
  return (
    <div className="ml-5 mt-5 flex space-x-4">
      <p>{`${followerCount} followers`}</p>
      <p>{`${followingCount} following`}</p>
    </div>
  )
}

export default ProfileFollowBlock
