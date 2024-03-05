import MessagesChatWindow from '../components/MessagesChatWindow/MessagesChatWindow'
import MessagesStoryComponent from '../components/MessagesStoryComponent/MessagesStoryComponent'

const MessagesPage = () => {
  return (
    <div className="flex">
      <MessagesStoryComponent />
      <MessagesChatWindow />
    </div>
  )
}

export default MessagesPage
