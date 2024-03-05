import { useEffect, useRef, useState } from 'react'
import MessageSingleItem from '../../shared/MessageSingleItem/MessageSingleItem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPaginatedMessages } from '../../store/reducers/messages/messagesActions'
import { socket } from '../../services/socket'
import {
  addMessage,
  resetMessages,
} from '../../store/reducers/messages/messagesSlice'
import { IMessageData } from '../../types/IMessageData'
import InboxIcon from '../../assets/Icons/InboxIcon'

interface MessagesContainerProps {
  chat_id: number
}

const MessagesContainer = ({ chat_id }: MessagesContainerProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const observer = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [messagesLimit, setMessagesLimit] = useState(20)
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false)
  const { messages, loading } = useAppSelector((state) => state.messages)

  useEffect(() => {
    setMessagesLimit(20)
    setAllMessagesLoaded(false)
  }, [chat_id])

  useEffect(() => {
    socket.emit('joinChat', { chatId: chat_id, userId: user?.uid })

    socket.on('newMessage', (newMessage: IMessageData) => {
      console.log('Received new message:', newMessage)
      dispatch(addMessage(newMessage))
    })

    return () => {
      socket.emit('leaveChat', { chatId: chat_id, userId: user?.uid })
      socket.off('newMessage')
      dispatch(resetMessages())
    }
  }, [chat_id, dispatch, user?.uid])

  useEffect(() => {
    if (loading || allMessagesLoaded) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMessagesLimit((prevLimit) => prevLimit + 20)
        }
      },
      {
        threshold: 0.25,
      }
    )

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current)
    }

    return () => observer.current?.disconnect()
  }, [loading, allMessagesLoaded])

  useEffect(() => {
    if (allMessagesLoaded) return

    const fetchMoreMessages = async () => {
      const newMessages = await dispatch(
        fetchPaginatedMessages({ limit: messagesLimit })
      ).unwrap()

      if (newMessages.length < messagesLimit) {
        setAllMessagesLoaded(true)
      }
    }

    fetchMoreMessages()
  }, [dispatch, messagesLimit, allMessagesLoaded])

  if (!Array.isArray(messages)) {
    return (
      <div className="flex w-full flex-col items-center justify-center dark:text-white">
        <InboxIcon />
        No messages to display
      </div>
    )
  }

  return (
    <div className="mb-32 mt-16 flex h-[calc(100%-4rem)] w-auto flex-col-reverse overflow-y-scroll md:mb-16">
      {messages.map((message, index) => (
        <MessageSingleItem key={index} message={message} />
      ))}
      <div ref={sentinelRef} className="h-[1px] w-full"></div>
    </div>
  )
}

export default MessagesContainer
