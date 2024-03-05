import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import usePostsBackend from '../../hooks/usePostsBackend'
import { IReturnedPostData } from '../../types/IPostData'
import Loader from '../../shared/Loader/Loader'
import PostsFeedItem from '../../shared/PostsFeedItem/PostsFeedItem'
import UserPlusIcon from '../../assets/Icons/UserPlusIcon'

const PostsFeed = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { getFollowedPosts } = usePostsBackend()
  const observer = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const [posts, setPosts] = useState<IReturnedPostData[]>([])
  const [limit, setLimit] = useState(2)
  const [isLoading, setIsLoading] = useState(true)
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  useEffect(() => {
    console.log(allPostsLoaded)
    if (user) {
      const getPosts = async (uid: string) => {
        if (allPostsLoaded) return
        try {
          setIsLoading(true)
          const posts = await getFollowedPosts(uid, limit)
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
      getPosts(user.uid)
    }
  }, [limit, user])

  useEffect(() => {
    if (isLoading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        //console.log('Observer triggered', entries[0].isIntersecting)
        if (entries[0].isIntersecting) {
          setLimit((prevLimit) => {
            return prevLimit + 2
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

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Loader />
      </div>
    )
  }
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-center text-2xl text-black dark:text-white ">
        <UserPlusIcon></UserPlusIcon>
        Follow someone to have posts in your feed!
      </div>
    )
  }

  return (
    <div className="relative z-10 mb-20 mt-5 flex w-full  flex-col items-center space-y-5 overflow-y-auto md:mb-0 md:max-h-[calc(100vh-4vh)] ">
      {posts.map((post, index) => (
        <PostsFeedItem post={post} key={index} />
      ))}
      <div ref={sentinelRef} className="mb-20 h-[1px] w-full"></div>
    </div>
  )
}

export default PostsFeed
