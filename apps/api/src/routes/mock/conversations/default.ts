import { Response, Request } from 'express'
import { conversations } from './jsons/conversation'
import { ResponseService } from '@/common/service/response'
import { T_Conversation } from '@repo/contract'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getConversations = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  if (!userId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const filterConvo = conversations.filter(
    (item) => item.hostId === userId || item.guestId === userId
  )

  const groupedConversations: { [key: number]: T_Conversation[] } = {}
  filterConvo.forEach((conversation) => {
    if (conversation?.Listing?.id !== undefined) {
      const listingId = conversation.Listing.id
      if (!groupedConversations[listingId]) {
        groupedConversations[listingId] = []
      }
      //@ts-ignore
      groupedConversations[listingId].push(conversation)
    }
  })

  const groupedConversationsWithLast: T_Conversation[] = []
  for (const key in groupedConversations) {
    if (Object.hasOwnProperty.call(groupedConversations, key)) {
      const convos = groupedConversations[key]
      if (convos && convos.length > 0) {
        const lastConvo = convos[convos.length - 1]
        //@ts-ignore
        groupedConversationsWithLast.push(lastConvo)
      }
    }
  }

  const convos = groupedConversationsWithLast
    .map((item) => ({
      asHost: item.Listing.hostId === userId,
      listingTitle: item.Listing.title,
      imageKey: item.Listing.imageKey,
      snippet: item.Message.message,
      createdAt: item.Message.createdAt,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateA - dateB
    })

  res.json(response.success({ items: convos, allItemCount: convos.length }))
}

export const addMessage = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const senderId = userId
  const now = new Date()
  const { listingId, message, receiverId } = req.body
  if (!listingId || (!message && !receiverId)) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const messageData = {
    id: 10,
    senderId: senderId,
    receiverId: receiverId,
    conversationId: 3,
    message: message,
    Sender: {
      id: senderId,
      name: 'Mark Hernandez',
    },
    Receiver: {
      id: receiverId,
      name: 'Jhay Hernandez',
    },
    createdAt: `${now.getFullYear()}:${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}:${now.getDate().toString().padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`,
  }

  const GuestData = {
    id: 1,
    name: 'Jhay Hernandez',
    imageKey: '1.jpg',
  }
  const HostData = {
    id: 5,
    name: 'Mark Hernandez',
    imageKey: '2.jpg',
  }
  const ListingData = {
    id: 7,
    hostId: 5,
    title: 'Cool Resort',
    address: 'Siargao City',
    hostName: 'Mark Hernandez',
  }
  const newConversation = {
    id: 7,
    listingId: listingId as number,
    messageId: messageData.id,
    guestId: 1,
    hostId: ListingData.hostId,
    Guest: GuestData,
    Host: HostData,
    Listing: ListingData,
    Message: messageData,
    createdAt: `${now.getFullYear()}:${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}:${now.getDate().toString().padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`,
  }
  //@ts-ignore
  if (!userId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  conversations.push(newConversation)

  res.json(
    response.success({
      item: newConversation,
      message: 'Message successfully sent',
    })
  )
}

export const getMessages = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  if (!userId) {
    res.json({ messages: USER_NOT_AUTHORIZED })
  }
  const conversationId = Number(req.params.conversationId)
  const convos = conversations.filter(
    (item) => item.Message.conversationId === conversationId
  )
  const messages = convos.map((item) => ({
    sender: item.Message.Sender.name,
    receiver: item.Message.Receiver.name,
    message: item.Message.message,
    createdAt: item.Message.createdAt,
  }))
  res.json(response.success({ items: messages, allItemCount: messages.length }))
}
