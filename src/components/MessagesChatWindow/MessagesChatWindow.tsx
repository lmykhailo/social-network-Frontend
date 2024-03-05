import { useAppSelector } from '../../hooks/redux'
import MessagesContainer from '../MessagesContainer/MessagesContainer'
import MessagesHeader from '../MessagesHeader/MessagesHeader'
import MessagesInputField from '../MessagesInputField/MessagesInputField'
import ChatBublesIcon from '../../assets/Icons/ChatBublesIcon'

const MessagesChatWindow = () => {
  const { messages } = useAppSelector((state) => state.messages)
  const chat_id = useAppSelector((state) => state.messages.currentChatId)

  if (!messages) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center  text-2xl text-black  dark:text-white ">
        <ChatBublesIcon />
        Choose a chat to start chatting!
      </div>
    )
  }

  if (!chat_id) {
    return null
  }

  return (
    <div className="relative flex h-screen w-full flex-col justify-center">
      <MessagesHeader chat_id={chat_id}></MessagesHeader>
      <MessagesContainer chat_id={chat_id}></MessagesContainer>
      <MessagesInputField chat_id={chat_id}></MessagesInputField>
    </div>
  )
}

export default MessagesChatWindow
