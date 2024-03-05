import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUserBackend from '../hooks/useUserBackend'
import { IUserData } from '../types/IUserData'
import ProfileUserInformation from '../components/ProfileUserInformation/ProfileUserInformation'
import Loader from '../shared/Loader/Loader'
import ProfilePosts from '../components/ProfilePosts/ProfilePosts'

const LoadingState = () => (
  <div className="flex items-center justify-center">
    <Loader />
  </div>
)

const ProfilePage = () => {
  const { uid } = useParams<{ uid: string }>()
  const { getOneUserByUsername } = useUserBackend()
  const [userFetched, setUserFetched] = useState<IUserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (uid) {
        setIsLoading(true)
        try {
          const fetchedUser = await getOneUserByUsername(uid)
          setUserFetched(fetchedUser)
        } catch (error) {
          console.error('Failed to fetch user:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [uid])

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <>
      <ProfileUserInformation userFetched={userFetched} />
      <ProfilePosts userFetched={userFetched} />
    </>
  )
}

export default ProfilePage
