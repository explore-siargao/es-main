import { z } from "zod"
import { Z_Conversation, Z_AddConversation } from "./zod"

export type T_Conversation = z.infer<typeof Z_Conversation>
export type T_AddConversation = z.infer<typeof Z_AddConversation>
