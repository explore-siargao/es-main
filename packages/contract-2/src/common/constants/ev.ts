import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../../.env") })

export const API_URL = process.env.API_URL || ""
export const API_AUTH_URL = process.env.API_AUTH_URL || ""
export const WEB_URL = process.env.WEB_URL || ""
