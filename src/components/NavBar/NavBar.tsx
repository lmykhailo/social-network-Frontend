import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import HomeIcon from '../../assets/Icons/HomeIcon'
import SearchIcon from '../../assets/Icons/SearchIcon'
import ProfileIcon from '../../assets/Icons/ProfileIcon'
import MessagesIcon from '../../assets/Icons/MessagesIcon'
import BarsIcon from '../../assets/Icons/BarsIcon'
import NavBarButton from '../../shared/NavBarButton/NavBarButton'
import {
  HOMEPAGE_ROUTE,
  MESSAGES_ROUTE,
  PROFILE_ROUTE,
  SEARCHPAGE_ROUTE,
} from '../../routes/consts'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import { getOneUserByUid } from '../../store/reducers/userBackend/userBackendActions'
import AddPostIcon from '../../assets/Icons/AddPostIcon'
import { toggleModalWindow } from '../../store/reducers/theme/themeSlice'
import { getNotifications } from '../../store/reducers/notifications/notificationsActions'
import { socket } from '../../services/socket'

const NavBar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user)
  const { notificationsCount } = useAppSelector((state) => state.notifications)
  const userNickname = useAppSelector((state) => state.userInformation.user)
  const dispatch = useAppDispatch()
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const profileLink = PROFILE_ROUTE.replace(
    ':uid',
    userNickname?.username || '404'
  )

  const navItems = [
    { route: HOMEPAGE_ROUTE, Icon: HomeIcon, label: 'Home' },
    { route: SEARCHPAGE_ROUTE, Icon: SearchIcon, label: 'Search' },
    {
      route: HOMEPAGE_ROUTE,
      Icon: AddPostIcon,
      label: 'Create post',
      onClick: () => {
        dispatch(toggleModalWindow())
      },
    },
    {
      route: MESSAGES_ROUTE,
      Icon: MessagesIcon,
      label: 'Messages',
    },
    {
      route: profileLink,
      Icon: ProfileIcon,
      label: 'Profile',
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getOneUserByUid(user.uid))
      dispatch(getNotifications(user.uid))

      socket.emit('registerUser', { userId: user.uid })
      socket.on('newNotification', () => {
        console.log('dasdas')
        dispatch(getNotifications(user.uid))
      })
    }
    return () => {
      socket.emit('unregisterUser')
      socket.off('newNotification')
    }
  }, [user, dispatch])

  return (
    <>
      {user ? (
        <nav
          className={`fixed inset-x-0 bottom-0 z-20 flex h-16 w-full flex-row justify-between border-t
        border-gray-600 bg-gray-300 text-black shadow-2xl dark:bg-slate-800 dark:text-white 
        md:fixed md:inset-x-auto md:bottom-auto md:left-0 md:top-0 md:h-screen md:w-20 md:flex-col
        md:justify-start md:border-r md:border-t-0 lg:w-60 `}
        >
          {navItems.map(({ route, Icon, label, onClick }) => (
            <NavLink
              key={label}
              to={route}
              className="flex items-center justify-center md:justify-start"
            >
              <NavBarButton onClick={onClick}>
                <Icon classNameProps="h-6 w-6" />
                <p className="ml-2 hidden lg:flex">{label}</p>
                {label === 'Messages' && notificationsCount > 0 && (
                  <p className="absolute h-6 w-6 rounded-full bg-red-500 text-white">
                    {notificationsCount}
                  </p>
                )}
              </NavBarButton>
            </NavLink>
          ))}
          <div
            ref={dropdownRef}
            className="relative mt-5 hidden md:flex "
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            <NavBarButton>
              <BarsIcon />
              <p className="ml-2 hidden lg:flex">More</p>
            </NavBarButton>
            <DropdownMenu visible={isDropdownVisible}></DropdownMenu>
          </div>
        </nav>
      ) : null}
    </>
  )
}

export default NavBar
