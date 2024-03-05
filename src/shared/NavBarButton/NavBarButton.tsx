import React from 'react'

interface NavBarButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

const NavBarButton: React.FC<NavBarButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="mx-1 flex h-full w-full items-center rounded-md px-3 py-1 hover:bg-slate-500 hover:bg-opacity-30 dark:text-white 
    dark:hover:bg-indigo-800 dark:hover:bg-opacity-30 md:my-4 "
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default NavBarButton
