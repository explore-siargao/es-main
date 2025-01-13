import { T_CardInfo } from "@repo/contract"
import { T_Add_To_Cart } from "../cart"
import { ApiService } from "../common/services/api"
import {
  T_Add_For_Payment,
  T_Linked_Card_Payment,
} from "../for-payment-listings"
import { T_Grouped_Reservations, T_Reservations } from "./type"

const RESERVATION_BASE_URL = `/reservations`
type T_Payment_Method = "gcash" | "card" | "manual"
type T_Reservation_Status = "Cancelled" | "Done" | "Active"

type T_Props = {
  cartItems: T_Add_To_Cart[]
  cardInfo?: string | undefined
  cardId?: string
  cvv?: string
  hmac?: string
  expirationDate?: Date
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

  async payForPayment(
    item: T_Add_For_Payment | T_Payment_Method | T_Linked_Card_Payment,
    type: T_Payment_Method
  ) {
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

  async getReservations(
    status: T_Reservation_Status = "Active",
    page: number = 1
  ) {
    return this.api.get<{ items: T_Reservations }>(
      `${RESERVATION_BASE_URL}/lists?status=${status}&page=${page}`
    )
  }

  async getGroupedReservations(page: number) {
    return this.api.get<{ items: T_Grouped_Reservations }>(
      `${RESERVATION_BASE_URL}/grouped?page=${page}`
    )
  }

  static getQueryKeys() {
    return {
      getItems: "get-reservation-item",
      getGroupedReservations: "get-grouped-reservations",
    }
  }
}
