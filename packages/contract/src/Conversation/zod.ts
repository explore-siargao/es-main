import { z } from "zod"

export const Z_Conversation = z.object({
  id: z.number(),
  listingId: z.number(),
  messageId: z.number(),
  guestId: z.number(),
  hostId: z.number(),
  Listing: z.object({
    id: z.number(),
    hostId: z.number(),
    title: z.string(),
    address: z.string(),
    hostName: z.string(),
    imageKey: z.string(),
  }),
  Message: z.object({
    id: z.number(),
    senderId: z.number(),
    receiverId: z.number(),
    message: z.string(),
    conversationId: z.number(),
    Sender: z.object({
      id: z.number(),
      name: z.string(),
    }),
    Receiver: z.object({
      id: z.number(),
      name: z.string(),
    }),
    createdAt: z.string(),
  }),
})

export const Z_AddConversation = z.object({
  listingId: z.number(),
  receiverId: z.number(),
  message: z.string(),
  createdAt: z.string().optional(),
  deletedAt: z.string().optional(),
})
