import EditProfilePage from '../pages/EditProfilePage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MessagesPage from '../pages/MessagesPage'
import ProfilePage from '../pages/ProfilePage'
import RegistrationPage from '../pages/RegistrationPage'
import SearchPage from '../pages/SearchPage'
import {
  FORGETPASSWORD_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE_ROUTE,
  SEARCHPAGE_ROUTE,
  MESSAGES_ROUTE,
  EDITPROFILE_ROUTE,
} from './consts'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
  {
    path: FORGETPASSWORD_ROUTE,
    Component: ForgetPasswordPage,
  },
]

export const privateRoutes = [
  {
    path: HOMEPAGE_ROUTE,
    Component: HomePage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: SEARCHPAGE_ROUTE,
    Component: SearchPage,
  },
  {
    path: MESSAGES_ROUTE,
    Component: MessagesPage,
  },
  {
    path: EDITPROFILE_ROUTE,
    Component: EditProfilePage,
  },
]
