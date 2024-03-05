import { useEffect, useRef, useState } from 'react'
import { IReturnedPostData } from '../../types/IPostData'
import Loader from '../../shared/Loader/Loader'
import PostPhotoIcon from '../../assets/Icons/PostPhotoIcon'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import usePostsBackend from '../../hooks/usePostsBackend'
import ProfilePostItem from '../../shared/ProfilePostItem/ProfilePostItem'
import { togglePostModalWindow } from '../../store/reducers/theme/themeSlice'
import PostModalWindow from '../PostModalWindow/PostModalWindow'
import { IUserData } from '../../types/IUserData'

interface ProfilePostsProps {
  userFetched: IUserData | null
}

const ProfilePosts = ({ userFetched }: ProfilePostsProps) => {
  const { modalPostWindow } = useAppSelector((state) => state.theme)
  const { getPosts } = usePostsBackend()
  const dispatch = useAppDispatch()
  const observer = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const [limit, setLimit] = useState(9)
  const [posts, setPosts] = useState<IReturnedPostData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IReturnedPostData | null>(
    null
  )

  useEffect(() => {
    console.log(allPostsLoaded)
    if (userFetched) {
      const getPostsForUser = async (uid: string) => {
        if (allPostsLoaded) return
        try {
          setIsLoading(true)
          const posts = await getPosts(uid, limit)
          setPosts(posts)
          if (posts.length < limit) {
            setAllPostsLoaded(true)
          }
        } catch (error) {
          console.error('Failed to fetch posts:', error)
        } finally {
          setIsLoading(false)
        }
      }
      getPostsForUser(userFetched.uid)
    }
  }, [limit, userFetched])

  useEffect(() => {
    if (isLoading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        //console.log('Observer triggered', entries[0].isIntersecting)
        if (entries[0].isIntersecting) {
          setLimit((prevLimit) => {
            return prevLimit + 10
          })
        }
      },
      {
        threshold: 0.5,
      }
    )

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current)
    }

    return () => observer.current?.disconnect()
  }, [isLoading, allPostsLoaded, setLimit])

  const handleClick = (post: IReturnedPostData) => {
    setSelectedPost(post)
    dispatch(togglePostModalWindow())
  }

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Loader />
      </div>
    )
  }
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div
        className="mt-10 flex w-full flex-col items-center justify-center 
      border-t border-black text-2xl text-black dark:border-white dark:text-white"
      >
        <PostPhotoIcon />
        User currently has no posts
      </div>
    )
  }

  return (
    <>
      <div className="mt-10 flex justify-around border-t border-black dark:border-white">
        <p className="mt-2 text-center text-black dark:text-white">POSTS</p>
      </div>
      <div className="flex justify-center">
        <div className="mt-4 grid w-full grid-cols-3 gap-[5px] overflow-y-auto  md:w-4/5 lg:w-[75%]">
          {posts.map((post) => {
            return (
              <ProfilePostItem
                post={post}
                key={post.post_id}
                onClick={handleClick}
              />
            )
          })}
          <div ref={sentinelRef} className="mb-20 h-[1px] w-full"></div>
          {selectedPost && modalPostWindow && (
            <PostModalWindow post={selectedPost} />
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePosts
