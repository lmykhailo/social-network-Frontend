import CloseIcon from '../../assets/Icons/CloseIcon'
import { useAppDispatch } from '../../hooks/redux'
import { togglePostModalWindow } from '../../store/reducers/theme/themeSlice'
import { IReturnedPostData } from '../../types/IPostData'

interface PostModalWindowProps {
  post: IReturnedPostData
}

const PostModalWindow = ({ post }: PostModalWindowProps) => {
  const dispatch = useAppDispatch()
  return (
    <div
      onClick={() => {
        dispatch(togglePostModalWindow())
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
    >
      <button className="absolute right-0 top-0 z-50 p-2 text-white hover:text-gray-300">
        <CloseIcon />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-5/6 w-full flex-col rounded-md bg-white shadow-lg dark:bg-slate-600 sm:w-5/6 sm:flex-row md:w-4/6"
      >
        <img
          src={post.photo_url}
          className="flex h-[75%] w-full rounded-md object-scale-down sm:h-full sm:w-[70%]"
        />
        <div className="mt-10 flex h-full w-full flex-col border-black text-black dark:border-white dark:text-white sm:mt-0 sm:w-[30%] sm:border-l">
          <div className="flex h-[10%] w-full items-center border-black dark:border-white sm:border-b">
            <img
              src={post.photoURL}
              className="h-12 w-12 rounded-full object-cover p-2"
            ></img>
            <p className="flex w-full items-center font-bold">
              {post.username}
            </p>
          </div>
          <p className="ml-2 mt-5 w-full text-black dark:text-white sm:mt-0">
            {post.username}: {post.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostModalWindow
