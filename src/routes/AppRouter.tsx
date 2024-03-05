import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { LOGIN_ROUTE, HOMEPAGE_ROUTE } from './consts'
import { RootState } from '../store/store'
import { useAppSelector } from '../hooks/redux'

const AppRouter = () => {
  const user = useAppSelector((state: RootState) => state.auth.user)

  return (
    <Routes>
      {user ? (
        <>
          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={HOMEPAGE_ROUTE} />} />
        </>
      ) : (
        <>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </>
      )}
    </Routes>
  )
}

export default AppRouter
