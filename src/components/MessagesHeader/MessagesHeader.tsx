import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectUserDetailsByChatId } from '../../store/reducers/chatUserDetails/chatUserDetailsSlice'
import { PROFILE_ROUTE } from '../../routes/consts'

interface MessagesHeaderProps {
  chat_id: number
}

const MessagesHeader = ({ chat_id }: MessagesHeaderProps) => {
  const userDetails = useAppSelector((state) =>
    selectUserDetailsByChatId(state, chat_id)
  )
  const profileLink = PROFILE_ROUTE.replace(
    ':uid',
    userDetails?.username || '404'
  )

  return (
    <div className="absolute top-0 flex h-14 w-full border-b border-black bg-slate-300 dark:bg-slate-500 dark:text-white">
      <NavLink to={profileLink} className="flex">
        <div className="ml-3 flex items-center space-x-4">
          <img
            src={userDetails?.photoURL || ''}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <p>{userDetails?.username}</p>
        </div>
      </NavLink>
    </div>
  )
}

export default MessagesHeader
