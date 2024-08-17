import mongoose from "mongoose"
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const MONGO_URL = process.env.MONGO_URL || ""

console.log('mongodb packages', MONGO_URL)
console.log('path', path.join(__dirname, '../../../../.env'))

export const initMongo = () =>
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is connected and running"))
    .catch((err) => console.log("MongoDB error: " + err))
