import CryptoJS from "crypto-js"
import { API_REQ_HMAC_ENCRYPT_KEY } from "./config"

type T_Payload = { [key: string]: unknown }

export class HMACService {
  public KEY: string | undefined
  constructor(type: "apiRequest" = "apiRequest") {
    if (type === "apiRequest") {
      this.KEY = API_REQ_HMAC_ENCRYPT_KEY
    }
  }
  generateHMAC(payload: T_Payload): string {
    const hmac = CryptoJS.HmacSHA256(JSON.stringify(payload), String(this.KEY))
    const hmacHex = hmac.toString(CryptoJS.enc.Hex)
    return hmacHex
  }
  // API Request HMAC
  createReqHMAC(payload: T_Payload): string {
    const hmac = this.generateHMAC(payload)
    return hmac
  }
  verifyReqHMAC(reqHMAC: string, payload: T_Payload): boolean {
    const hmac = this.generateHMAC(payload)
    return reqHMAC === hmac
  }
}
