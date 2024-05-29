import express from 'express'

const router = express.Router()

// DEFAULT
router.get('/', () => console.log('test user mock'))

export default router
