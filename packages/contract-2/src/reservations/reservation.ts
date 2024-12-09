import { T_CardInfo } from "@repo/contract"
import { T_Add_To_Cart } from "../cart"
import { ApiService } from "../common/services/api"

const RESERVATION_BASE_URL = `/reservations`
type T_Payment_Method = "gcash" | "card" | "manual"

type T_Props = {
  cartItems: T_Add_To_Cart[]
  cardInfo?: T_CardInfo | undefined
  cardId?: string,
  cvv?: string
}

export class ReservationService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async payCart(item: T_Props, type: T_Payment_Method) {
    if (type === "gcash") {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/gcash`, item)
    } else if (type === "card") {
      return this.api.post(`${RESERVATION_BASE_URL}/cart/checkout/card`, item)
    } else if (type === "manual") {
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
