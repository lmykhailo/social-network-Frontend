import CenteredBlockContainer from '../shared/CenteredBlockContainer/CenteredBlockContainer'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../routes/consts'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'

const RegistrationPage = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center ">
        <CenteredBlockContainer>
          <div className="flex  h-full w-full flex-col">
            <h1 className="text-2xl font-black">Registration</h1>
            <RegistrationForm></RegistrationForm>
          </div>
        </CenteredBlockContainer>
        <CenteredBlockContainer>
          <NavLink to={LOGIN_ROUTE} className=" hover:text-white">
            <p>Back to login page</p>
          </NavLink>
        </CenteredBlockContainer>
      </div>
    </>
  )
}

export default RegistrationPage
