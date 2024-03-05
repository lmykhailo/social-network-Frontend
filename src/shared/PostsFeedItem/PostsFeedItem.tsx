import { NavLink } from 'react-router-dom'
import { IReturnedPostData } from '../../types/IPostData'
import { PROFILE_ROUTE } from '../../routes/consts'

const PostsFeedItem = ({ post }: { post: IReturnedPostData }) => {
  const profileRoute = PROFILE_ROUTE.replace(':uid', post.username)
  return (
    <div
      className="relative flex w-10/12 flex-col rounded-md bg-white 
    bg-opacity-30 shadow-lg drop-shadow-lg backdrop-blur-lg md:w-3/5 lg:w-2/5"
    >
      <div className="flex items-center">
        <img
          src={post.photoURL}
          className="h-12 w-12 rounded-full object-cover p-2"
        ></img>
        <NavLink to={profileRoute}>
          <p className="flex w-full justify-start font-bold">{post.username}</p>
        </NavLink>
      </div>
      <img
        src={post.photo_url}
        className="flex h-[300px] w-full object-cover md:h-[480px] "
      ></img>
      <div className="my-3 flex">
        <NavLink to={profileRoute}>
          <p className="ml-2 flex w-full justify-start font-bold">
            {post.username}:
          </p>
        </NavLink>
        <p className="ml-2 w-full ">{post.description}</p>
      </div>
    </div>
  )
}
export default PostsFeedItem
