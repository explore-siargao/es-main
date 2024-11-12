import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'
import fileupload from 'express-fileupload'
import routes from '@/routes'
import { ALLOWED_CLIENTS, API_PORT } from '@/common/constants/ev'
import '@/common/utils/redisClient'
import { initMongo } from '@repo/database'
import priceConversion from '@/common/middleware/price-conversion'

const es = express()
es.disable('x-powered-by')
es.use(cookies())
es.use(express.json())
es.use(fileupload())
es.use(priceConversion)
es.use(
  cors({
    origin: ALLOWED_CLIENTS,
    credentials: true,
  })
)
initMongo()
routes(es)
es.listen(API_PORT, () => {
  console.log(`API server is running at PORT ${API_PORT}`)
})
