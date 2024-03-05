import { NavLink } from 'react-router-dom'
import { IUserData } from '../../types/IUserData'
import { PROFILE_ROUTE } from '../../routes/consts'

interface UserSearchBlockProps {
  user: IUserData
}

const UserSearchBlock = ({ user }: UserSearchBlockProps) => {
  let newProfileRoute = PROFILE_ROUTE.replace(':uid', user.username)
  return (
    <NavLink to={newProfileRoute}>
      <div
        className="mt-3 flex w-64 flex-col items-center rounded-md 
         bg-gray-300 p-5 text-zinc-700 shadow-lg drop-shadow-lg backdrop-blur-lg dark:bg-slate-400 md:w-96"
      >
        <div className="flex w-full justify-between">
          <img
            src={user.photoURL}
            alt="User profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div className="flex flex-col justify-between">
            <p className="text-lg font-bold">{user.username}</p>
            <p className="text-xs">{user.displayName}</p>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default UserSearchBlock
