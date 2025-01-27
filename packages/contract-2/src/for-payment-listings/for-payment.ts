import { ApiService } from "../common/services/api"
import { T_Add_For_Payment, T_Update_For_Payment } from "./type"

const FOR_PAYMENT_BASE_URL = `/for-payment`

export class ForPaymentService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addForPayment(item: T_Add_For_Payment) {
    return this.api.post(FOR_PAYMENT_BASE_URL, item)
  }

  async updateForPayment(itemId: string, item: T_Update_For_Payment) {
    return this.api.patch(`${FOR_PAYMENT_BASE_URL}/${itemId}`, item)
  }

  async getForPayment(itemId: string) {
    return this.api.get(`${FOR_PAYMENT_BASE_URL}/${itemId}`)
  }
  static getQueryKeys() {
    return {
      getItems: "get-for-payment-listings",
    }
  }
}
