import { IChatData } from '../../types/IChatData'
import NavBarButton from '../NavBarButton/NavBarButton'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPaginatedMessages } from '../../store/reducers/messages/messagesActions'
import { selectUserDetailsByChatId } from '../../store/reducers/chatUserDetails/chatUserDetailsSlice'
import { setCurrentChatId } from '../../store/reducers/messages/messagesSlice'
import { socket } from '../../services/socket'
import { markChatAsRead } from '../../store/reducers/notifications/notificationsSlice'
import { removeChatReadStatus } from '../../store/reducers/chats/chatsSlice'

interface ChatStoryItemProps {
  chat: IChatData
}

const ChatStoryItem = ({ chat }: ChatStoryItemProps) => {
  const dispatch = useAppDispatch()
  const clientUser = useAppSelector((state) => state.auth.user)
  const userFetched = useAppSelector((state) =>
    selectUserDetailsByChatId(state, chat.chat_id)
  )

  const isChatUnread =
    clientUser?.uid === chat.user1_uid ? !chat.user1_read : !chat.user2_read

  if (!userFetched || !clientUser) {
    return null
  }

  const handleClick = () => {
    dispatch(setCurrentChatId(chat.chat_id))
    socket.emit('readChat', {
      chat_id: chat.chat_id,
      user_uid: clientUser.uid,
    })
    dispatch(markChatAsRead(chat.chat_id))
    dispatch(
      removeChatReadStatus({ chat_id: chat.chat_id, user_uid: clientUser.uid })
    )
    dispatch(fetchPaginatedMessages({ limit: 20 }))
  }

  return (
    <div
      className="mb-5 flex w-full items-center justify-center md:mb-0 md:justify-start"
      onClick={handleClick}
    >
      <NavBarButton>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <img
              src={userFetched.photoURL || ''}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="ml-2 hidden md:flex md:flex-col">
              <p className="mb-1 text-xs">{userFetched?.username}</p>
              <p className="text-xs">
                {chat.last_message_content === null
                  ? ''
                  : chat.last_message_content?.slice(0, 15) + '...'}
              </p>
            </div>
          </div>
          {isChatUnread && (
            <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
      </NavBarButton>
    </div>
  )
}

export default ChatStoryItem
