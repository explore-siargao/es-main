import mongoose from "mongoose"
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../../../.env') })

const MONGO_URL = process.env.MONGO_URL || ""

export const initMongo = () =>
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is connected and running"))
    .catch((err) => console.log("MongoDB error: " + err))
