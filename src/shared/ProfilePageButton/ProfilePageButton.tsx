interface ProfilePageButtonProps {
  text: string
  onClick?: () => void
}

const ProfilePageButton = ({ text, onClick }: ProfilePageButtonProps) => {
  return (
    <button
      className="rounded-lg bg-gray-400 px-4 py-1.5 text-sm  hover:bg-gray-500 hover:bg-opacity-30 
      dark:bg-slate-800 dark:text-white dark:hover:bg-indigo-800 dark:hover:bg-opacity-30"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ProfilePageButton
