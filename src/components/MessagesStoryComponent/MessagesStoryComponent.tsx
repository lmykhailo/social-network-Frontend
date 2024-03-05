import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getChats } from '../../store/reducers/chats/chatsActions'
import { fetchChatsAndUserDetails } from '../../store/reducers/chatUserDetails/chatUserDetailsActions'
import { socket } from '../../services/socket'
import ChatStoryItem from '../../shared/ChatStoryItem/ChatStoryItem'

const MessagesStoryComponent = () => {
  const dispatch = useAppDispatch()
  const { chats } = useAppSelector((state) => state.chats)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(getChats(user.uid))
      dispatch(fetchChatsAndUserDetails(user.uid))
      socket.on('newNotification', () => {
        dispatch(getChats(user.uid))
      })
    }

    return () => {
      //  socket.off('newNotification')
    }
  }, [user, dispatch])

  return (
    <nav
      className={`inset-x-0 bottom-0 flex h-screen w-28 flex-col items-center
          border-gray-600 bg-gray-300 text-black dark:bg-slate-800 dark:text-white 
         md:relative md:inset-x-auto md:bottom-auto md:left-0 md:top-0 md:h-screen md:w-72
         md:flex-col md:justify-start md:border-r md:border-t-0 lg:w-80 `}
    >
      <p className="flex h-14 items-center justify-center text-black dark:text-white md:ml-5">
        Messages
      </p>
      {chats?.map((chat, index) => <ChatStoryItem key={index} chat={chat} />)}
    </nav>
  )
}

export default MessagesStoryComponent
