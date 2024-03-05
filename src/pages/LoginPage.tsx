import LoginForm from '../components/LoginForm/LoginForm'
import { NavLink } from 'react-router-dom'
import { FORGETPASSWORD_ROUTE, REGISTRATION_ROUTE } from '../routes/consts'
import CenteredBlockContainer from '../shared/CenteredBlockContainer/CenteredBlockContainer'

import LoginGoogleButton from '../components/LoginGoogleButton/LoginGoogleButton'

const LoginPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <CenteredBlockContainer>
          <div className="flex  h-full w-full flex-col">
            <h1 className="text-2xl font-black">Log in</h1>

            <LoginForm />

            <LoginGoogleButton />

            <NavLink to={FORGETPASSWORD_ROUTE}>
              <p className="text-center hover:text-white">Forgot password?</p>
            </NavLink>
          </div>
        </CenteredBlockContainer>
        <CenteredBlockContainer>
          <NavLink to={REGISTRATION_ROUTE} className=" hover:text-white">
            <p>Don't have an account? Sign up!</p>
          </NavLink>
        </CenteredBlockContainer>
      </div>
    </>
  )
}

export default LoginPage
