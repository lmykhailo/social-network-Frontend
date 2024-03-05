import { IChatData } from '../types/IChatData'

export function chatExists(chats: IChatData[], newChat: IChatData) {
  return chats.some((chat) => chat.chat_id === newChat.chat_id)
}
