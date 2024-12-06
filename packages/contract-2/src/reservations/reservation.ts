import { T_CardInfo } from "@repo/contract"
import { T_Add_To_Cart } from "../cart"
import { ApiService } from "../common/services/api"

const RESERVATION_BASE_URL = `/reservations`
type PaymentMethod = "gcash" | "card" | "manual"

type T_Props = {
  cartItems: T_Add_To_Cart[],
  cardInfo: T_CardInfo | undefined
}

export class ReservationService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: T_Props, type: PaymentMethod) {
      console.log(item)
    if (type === "gcash") {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/gcash`, item)
    } else if (type === "card") {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/card`, item)
    } else {
      return this.api.post(
        `${RESERVATION_BASE_URL}/cart/checkout/manual-card`,
        item
      )
    }
  }

  static getQueryKeys() {
    return {
      getItems: "get-reservation-item",
    }
  }
}
