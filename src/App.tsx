import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import NavBar from './components/NavBar/NavBar'
import { useAppSelector } from './hooks/redux'

const App = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className="flex">
        <NavBar />
        <div className="flex-1 md:pl-20 lg:pl-60">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
