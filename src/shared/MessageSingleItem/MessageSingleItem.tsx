import { useAppSelector } from '../../hooks/redux'
import { IMessageData } from '../../types/IMessageData'

interface MessageSingleItemProps {
  message: IMessageData
}

const MessageSingleItem = ({ message }: MessageSingleItemProps) => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div
      className={`my-1 flex max-w-max rounded-lg p-2 text-sm ${
        user?.uid === message.sender_uid
          ? 'mr-1 self-end bg-blue-500 text-white'
          : 'ml-1 self-start bg-gray-400 text-black'
      }`}
    >
      {message.content}
    </div>
  )
}

export default MessageSingleItem
