import { T_Add_To_Cart } from "../cart"
import { ApiService } from "../common/services/api"

const RESERVATION_BASE_URL = `/reservations`
type PaymentMethod = "gcash" | "card"
export class ReservationService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: T_Add_To_Cart[], type: PaymentMethod) {
    if (type === "gcash") {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/gcash`, item)
    } else {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/card`, item)
    }
  }

  static getQueryKeys() {
    return {
      getItems: "get-reservation-item",
    }
  }
}
