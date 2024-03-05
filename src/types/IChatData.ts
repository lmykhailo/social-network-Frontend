export interface IChatData {
  chat_id: number
  user1_uid: string
  user2_uid: string
  last_message_content?: string
  last_message_timestamp?: string
  user1_read?: boolean
  user2_read?: boolean
}
