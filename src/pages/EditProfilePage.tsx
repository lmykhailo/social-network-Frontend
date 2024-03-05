import { useEffect, useState } from 'react'
import CenteredBlockContainer from '../shared/CenteredBlockContainer/CenteredBlockContainer'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import useUserBackend from '../hooks/useUserBackend'
import { IUserData } from '../types/IUserData'
import Loader from '../shared/Loader/Loader'
import EditProfileForm from '../components/EditProfileForm/EditProfileForm'
import { toggleDarkMode } from '../store/reducers/theme/themeSlice'
import SubmitFormsButton from '../shared/SubmitFormsButton/SubmitFormsButton'
import { handleLogout } from '../store/reducers/auth/authActions'

const EditProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const [userInformation, setUserInformation] = useState<IUserData | null>(null)
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.theme.darkMode)
  const { getOneUserByUid } = useUserBackend()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setIsLoading(true)
        try {
          const fetchedUser = await getOneUserByUid(user.uid)
          setUserInformation(fetchedUser)
        } catch (error) {
          console.error('Failed to fetch user:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [user?.uid])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader></Loader>
      </div>
    )
  }

  if (!userInformation) {
    return (
      <div className="flex items-center justify-center">
        ERROR TRYING TO GET USER INFORMATION PLEASE REPORT THIS ISSUE TO SUPPORT
      </div>
    )
  }

  return (
    <div className="-mt-10 flex h-screen flex-col items-center justify-center">
      <CenteredBlockContainer>
        <div className="flex  h-full w-full flex-col">
          <h1 className="text-2xl font-black dark:text-white">
            Edit profile information
          </h1>
          <EditProfileForm userInformation={userInformation}></EditProfileForm>
        </div>
      </CenteredBlockContainer>

      <CenteredBlockContainer>
        <SubmitFormsButton
          text={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={() => dispatch(toggleDarkMode())}
        ></SubmitFormsButton>
        <SubmitFormsButton
          text="Logout"
          onClick={() => dispatch(handleLogout())}
        ></SubmitFormsButton>
      </CenteredBlockContainer>
    </div>
  )
}

export default EditProfilePage
