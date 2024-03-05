import { useState } from 'react'
import { fetchData } from '../functions/fetchData'

const useUserInfoFromChat = () => {
  const [error, setError] = useState(null)

  const getUserInfo = async (chat_id: number, uid: string) => {
    return await fetchData(`/api/chats/${chat_id}/${uid}`)
  }

  return {
    getUserInfo,
    error,
  }
}

export default useUserInfoFromChat
