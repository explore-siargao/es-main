import { ApiService } from "../common/services/api"
import { T_Cart, T_UpdateCart } from "./type"

const CART_BASE_URL = `/api/v1/carts`

export class CartService {
  private api: ApiService
  constructor(source: "main" | "auth" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: T_Cart) {
    return this.api.post(CART_BASE_URL, item)
  }
  async updateItem(itemId: string, item: T_UpdateCart) {
    return this.api.patch(`${CART_BASE_URL}/${itemId}`, item)
  }
  async removeItem(itemId: string) {
    return this.api.delete(`${CART_BASE_URL}/${itemId}`)
  }
  async getItems() {
    return this.api.get<{ items: T_Cart[] }>(CART_BASE_URL)
  }
  static getQueryKeys() {
    return {
      getItems: "get-cart-item",
    }
  }
}
