import { IChatData } from '../types/IChatData'

export const baseUrl = 'http://localhost:8080'
export const getAnotherUserUid = async (
  uid: string,
  chat_id: number
): Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/api/one-chat/${chat_id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch chat details')
    }
    const chats: IChatData[] = await response.json()
    if (chats.length === 0) {
      throw new Error('Chat not found')
    }
    const chat = chats[0]
    const otherUserUid =
      chat.user1_uid === uid ? chat.user2_uid : chat.user1_uid
    return otherUserUid
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get another user uid!')
  }
}
