import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../../.env") })

export const PASSWORD_ENCRYPT_KEY = process.env.PASSWORD_ENCRYPT_KEY || ""
export const CARD_ENCRYPT_KEY = process.env.CARD_ENCRYPT_KEY || ""
export const CSRF_SIGN_KEY = process.env.CSRF_SIGN_KEY || ""
export const API_REQ_HMAC_ENCRYPT_KEY =
  process.env.API_REQ_HMAC_ENCRYPT_KEY || ""
