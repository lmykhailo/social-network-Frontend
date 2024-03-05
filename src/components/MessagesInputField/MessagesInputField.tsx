import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { getAnotherUserUid } from '../../functions/getAnotherUserUid'
import { socket } from '../../services/socket'

interface MessagesInputFieldProps {
  chat_id: number
}

const MessagesInputField = ({ chat_id }: MessagesInputFieldProps) => {
  const [message, setMessage] = useState('')
  const { user } = useAppSelector((state) => state.auth)

  const handleSendMessage = async () => {
    if (message.trim() && user && chat_id !== -1) {
      try {
        const recieverUid = await getAnotherUserUid(user.uid, chat_id)
        const newMessage = {
          chat_id: chat_id,
          reciever_uid: recieverUid,
          sender_uid: user.uid,
          content: message,
        }
        //await dispatch(createMessage(newMessage)).unwrap()
        socket.emit('sendMessage', newMessage)
        setMessage('')
      } catch (error) {
        console.error('Failed to send message:', error)
      }
    }
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="absolute bottom-0 mb-16 flex h-16 w-full border-t border-black bg-slate-300 px-4 dark:bg-slate-500 dark:text-white md:absolute md:mb-0">
      <div className="flex w-full items-center">
        <input
          type="text"
          className="h-3/4 w-full flex-1 items-center rounded-lg border p-2  dark:border-slate-700 dark:bg-slate-600 dark:text-white"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <button
          className="ml-4 h-3/4 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessagesInputField
