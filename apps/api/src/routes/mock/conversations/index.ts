import express from 'express'
import { getConversations, addMessage, getMessages } from './default'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'

const router = express.Router()

// DEFAULT
router.get('/', isCsrfTokenValid2, getConversations)
router.get('/:conversationId/messages', isCsrfTokenValid2, getMessages)
router.post('/', isCsrfTokenValid2, addMessage)

export default router
