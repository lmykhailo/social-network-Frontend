import { IReturnedPostData } from '../../types/IPostData'

interface ProfilePostItemProps {
  post: IReturnedPostData
  onClick: (post: IReturnedPostData) => void
}

const ProfilePostItem = ({ post, onClick }: ProfilePostItemProps) => {
  return (
    <div className="relative" onClick={() => onClick(post)}>
      <img
        src={post.photo_url}
        className="h-[120px] w-full rounded-md object-cover sm:h-[180px] md:h-[180px] lg:h-60 lg:w-[95%]"
      />
    </div>
  )
}

export default ProfilePostItem
