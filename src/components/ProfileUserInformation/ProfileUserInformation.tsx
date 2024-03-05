import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createChat } from '../../store/reducers/chats/chatsActions'
import { getMessages } from '../../store/reducers/messages/messagesActions'
import { setCurrentChatId } from '../../store/reducers/messages/messagesSlice'
import { addChat } from '../../store/reducers/chats/chatsSlice'
import { fetchFollowCounts } from '../../store/reducers/following/followingActions'
import ProfilePageButton from '../../shared/ProfilePageButton/ProfilePageButton'
import FollowButton from '../../shared/FollowButton/FollowButton'
import ProfileFollowBlock from '../ProfileFollowBlock/ProfileFollowBlock'
import { IUserData } from '../../types/IUserData'
import {
  EDITPROFILE_ROUTE,
  HOMEPAGE_ROUTE,
  MESSAGES_ROUTE,
} from '../../routes/consts'
import UserMinusIcon from '../../assets/Icons/UserMinusIcon'
import { fetchChatsAndUserDetails } from '../../store/reducers/chatUserDetails/chatUserDetailsActions'

const UserNotFoundState = () => (
  <div className="mt-10 flex flex-col items-center justify-center text-xl text-black dark:text-white">
    <UserMinusIcon />
    Can not find this user
    <NavLink to={HOMEPAGE_ROUTE}>
      <span className="text-black underline dark:text-white">
        Go back to the home page?
      </span>
    </NavLink>
  </div>
)

interface ProfileUserInformationProps {
  userFetched: IUserData | null
}

const ProfileUserInformation = ({
  userFetched,
}: ProfileUserInformationProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(({ auth }) => auth)

  const handleMessageClick = async () => {
    if (!user) return

    try {
      const chatResponse = await dispatch(
        createChat({
          user1_uid: user.uid,
          user2_uid: userFetched!.uid,
        })
      ).unwrap()

      dispatch(addChat(chatResponse))
      dispatch(fetchChatsAndUserDetails(user.uid))
      dispatch(setCurrentChatId(chatResponse.chat_id))
      dispatch(getMessages())
    } catch (error) {
      console.error('Error handling message click:', error)
    }
  }

  if (!userFetched) {
    return <UserNotFoundState />
  }

  if (userFetched.uid === user?.uid) {
    dispatch(fetchFollowCounts({ uid: user.uid }))
  }

  return (
    <section className="mt-5 flex  justify-center dark:text-white">
      <div className="flex">
        <img
          src={userFetched.photoURL || ''}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <div className="ml-2 flex-col sm:ml-16">
        <div className="flex flex-col space-x-4 sm:flex-row">
          <h1 className="ml-5 mr-3 text-xl font-semibold">
            {userFetched.username}
          </h1>
          <div className="flex space-x-4 ">
            {userFetched.uid === user?.uid ? (
              <NavLink to={EDITPROFILE_ROUTE}>
                <ProfilePageButton text="Edit profile" />
              </NavLink>
            ) : (
              <>
                <FollowButton following_uid={userFetched.uid} />
                <NavLink to={MESSAGES_ROUTE}>
                  <ProfilePageButton
                    text="Message"
                    onClick={handleMessageClick}
                  />
                </NavLink>
              </>
            )}
          </div>
        </div>
        <ProfileFollowBlock />
        <div className="ml-5 flex ">
          <h1 className="mr-5 mt-5 text-sm font-semibold sm:mt-10">
            {userFetched.displayName}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default ProfileUserInformation
