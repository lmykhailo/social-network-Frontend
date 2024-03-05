interface SubmitFormsButtonInterface {
  text: string
  onClick?: () => void
}

const SubmitFormsButton = ({ text, onClick }: SubmitFormsButtonInterface) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="my-3 w-full rounded-md bg-gray-400 px-5 py-2 text-black hover:bg-gray-500 hover:bg-opacity-30 
      dark:bg-slate-800 dark:text-white dark:hover:bg-indigo-800  dark:hover:bg-opacity-30"
    >
      {text}
    </button>
  )
}

export default SubmitFormsButton
