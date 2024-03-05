import { IPostData } from '../types/IPostData'
import { fetchData } from '../functions/fetchData'

const usePostsBackend = () => {
  const createPost = async (data: IPostData) => {
    return await fetchData('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const getPosts = async (uid: string, limit: number) => {
    return await fetchData(`/api/posts/${uid}?limit=${limit}`)
  }
  const getFollowedPosts = async (uid: string, limit: number) => {
    return await fetchData(`/api/followed-posts/${uid}?limit=${limit}`)
  }
  return {
    createPost,
    getPosts,
    getFollowedPosts,
  }
}

export default usePostsBackend
