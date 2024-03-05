import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../routes/consts'
import CenteredBlockContainer from '../shared/CenteredBlockContainer/CenteredBlockContainer'
import ForgetPasswordForm from '../components/ForgetPasswordForm/ForgetPasswordForm'

const ForgetPasswordPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <CenteredBlockContainer>
        <h1 className="my-2 text-xl font-black">Trouble loging in?</h1>
        <h2 className="text-mg text-center">
          Enter your email and we'll send you a link to get back into your
          account.
        </h2>
        <ForgetPasswordForm></ForgetPasswordForm>
      </CenteredBlockContainer>
      <CenteredBlockContainer>
        <NavLink to={LOGIN_ROUTE} className=" hover:text-white">
          <p>Back to login page</p>
        </NavLink>
      </CenteredBlockContainer>
    </div>
  )
}

export default ForgetPasswordPage
