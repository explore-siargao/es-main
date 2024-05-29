import express from 'express'
import { getConversations, addMessage, getMessages } from './default'
import isUserLoggedIn2 from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'

const router = express.Router()

// DEFAULT
router.get('/', isUserLoggedIn2, isCsrfTokenValid2, getConversations)
router.get(
  '/:conversationId/messages',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  getMessages
)
router.post('/', isUserLoggedIn2, isCsrfTokenValid2, addMessage)

export default router
