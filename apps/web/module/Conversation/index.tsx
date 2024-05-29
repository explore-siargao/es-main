"use client"
import ChatSidebar, { BadgeType } from "./components/ChatSidebar"
import MessageConversation from "./components/MessageConversation"

const chats = [
  {
    title: "Siargao Kubo Club",
    message: "okay let's go!",
    badge: BadgeType.AsGuest,
    isSelected: true,
  },
  {
    title: "Peritiria Hotel",
    message: "Please review and approve the document as soon as possible.",
    badge: BadgeType.AsGuest,
  },
  {
    title: "Hotel Aperatus",
    message: "Hi, how are you doing today?",
    badge: BadgeType.AsGuest,
  },
  {
    title: "Mark's Apartel",
    message: "Don't forget about the meeting tomorrow at 10 AM.",
    badge: BadgeType.AsHost,
  },
]

const messages = [
  {
    imageKey: "1.jpg",
    message: "Hello, how are you?",
    timeSent: "2024-03-28T12:00:00",
    isSender: true,
    isSeen: true,
  },
  {
    imageKey: "1.jpg",
    message: "Hello, im fine",
    timeSent: "2024-03-28T12:03:00",
    isSender: false,
    isSeen: true,
  },
  {
    imageKey: "1.jpg",
    message: "Wanna grab some food?",
    timeSent: "2024-03-28T12:03:00",
    isSender: true,
    isSeen: true,
  },
  {
    imageKey: "1.jpg",
    message: "okay let's go!",
    timeSent: "2024-03-28T12:03:00",
    isSender: false,
    isSeen: true,
  },
]

const ConversationPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white">
        <ChatSidebar chats={chats} />
      </div>
      <div className="flex-1 md:flex flex-col-reverse">
        <MessageConversation messages={messages} />
      </div>
    </div>
  )
}

export default ConversationPage
