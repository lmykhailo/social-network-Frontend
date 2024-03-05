import React from 'react'

const CenteredBlockContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className="mt-3 flex w-96 flex-col items-center 
         rounded-md bg-gray-300 p-5 text-zinc-700 shadow-lg drop-shadow-lg backdrop-blur-lg dark:bg-slate-400"
    >
      {children}
    </div>
  )
}

export default CenteredBlockContainer
