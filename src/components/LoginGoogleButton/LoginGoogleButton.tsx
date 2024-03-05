import { checkUsernameAvailability } from '../../functions/checkUsernameAvailability'
import { generateUniqueUsername } from '../../functions/generateUniqueUsername'
import { sanitizeUsername } from '../../functions/sanitazeUsername'
import { useAppDispatch } from '../../hooks/redux'
import useUserBackend from '../../hooks/useUserBackend'
import { signInUsingGoogle } from '../../store/reducers/auth/authActions'
import { IUserData } from '../../types/IUserData'
import SubmitFormsButton from '../../shared/SubmitFormsButton/SubmitFormsButton'

const LoginGoogleButton = () => {
  const dispatch = useAppDispatch()
  const { createUser } = useUserBackend()
  const onUsingGoogle = async () => {
    try {
      const registrationResult = await dispatch(signInUsingGoogle()).unwrap()
      let username = sanitizeUsername(registrationResult.displayName || '')

      const isAvailable = await checkUsernameAvailability(username)
      if (!isAvailable) {
        username = await generateUniqueUsername(username)
      }

      const userData: IUserData = {
        email: registrationResult.email || '',
        displayName: registrationResult.displayName || '',
        photoURL:
          registrationResult.photoURL ||
          'https://firebasestorage.googleapis.com/v0/b/weatherappproject-bc43d.appspot.com/o/profilePictures%2Fanonymoususer.jpg?alt=media&token=32635f96-9783-4211-999a-b559e3b13974',
        uid: registrationResult.uid,
        username: username,
      }

      await createUser(userData)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
  return (
    <>
      <SubmitFormsButton text="Sign in using Google" onClick={onUsingGoogle} />
    </>
  )
}

export default LoginGoogleButton
