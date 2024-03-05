import { NavLink } from 'react-router-dom'
import { EDITPROFILE_ROUTE } from '../../routes/consts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { handleLogout } from '../../store/reducers/auth/authActions'
import { toggleDarkMode } from '../../store/reducers/theme/themeSlice'
import SettingsIcon from '../../assets/Icons/SettingsIcon'
import LogoutIcon from '../../assets/Icons/LogoutIcon'
import DarkThemeIcon from '../../assets/Icons/DarkThemeIcon'
import LightThemeIcon from '../../assets/Icons/LightThemeIcon'

interface DropdownMenuProps {
  visible: boolean
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ visible }) => {
  const dispatch = useAppDispatch()

  const darkTheme = useAppSelector((state) => state.theme.darkMode)

  const onLogout = () => {
    dispatch(handleLogout())
  }
  const onSwitchTheme = () => {
    dispatch(toggleDarkMode())
  }

  if (!visible) return null

  return (
    <div className="absolute right-0 top-full z-10 mt-2 w-full rounded-lg bg-white py-2 text-black shadow-md">
      <NavLink
        to={EDITPROFILE_ROUTE}
        className="flex w-full px-4 py-2 text-black hover:bg-gray-100"
      >
        <p className="hidden lg:flex">
          <SettingsIcon />
        </p>
        <p className="ml-2">Settings</p>
      </NavLink>
      <p
        className="flex px-4 py-2 text-black hover:cursor-pointer hover:bg-gray-100"
        onClick={onSwitchTheme}
      >
        {darkTheme ? (
          <>
            <p className="hidden lg:flex">
              <LightThemeIcon />
            </p>
            <p className="ml-2">Switch to light theme</p>
          </>
        ) : (
          <>
            <p className="hidden lg:flex">
              <DarkThemeIcon />
            </p>
            <p className="ml-2">Switch to dark theme</p>
          </>
        )}
      </p>
      <p
        className="flex px-4 py-2 text-black hover:cursor-pointer hover:bg-gray-100"
        onClick={onLogout}
      >
        <p className="hidden lg:flex">
          <LogoutIcon />
        </p>
        <p className="ml-2">Log out</p>
      </p>
    </div>
  )
}

export default DropdownMenu
