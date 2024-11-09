import { ApiService } from "../common/services/api"
import { T_AddCart, T_UpdateCart, T_CartItem } from "./type"

const CART_BASE_URL = `/api/v1/carts`

export class CartService {
  private api: ApiService
  constructor(source: "main" | "auth" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: T_AddCart) {
    return this.api.post(CART_BASE_URL, item)
  }
  async updateItem(itemId: string, item: T_UpdateCart) {
    return this.api.patch(`${CART_BASE_URL}/${itemId}`, item)
  }
  async removeItem(itemId: string) {
    return this.api.delete(`${CART_BASE_URL}/${itemId}`)
  }

  async removeMultipleItems(cartIds: string[]) {
    return this.api.delete(`${CART_BASE_URL}/remove-multiple`, cartIds)
  }

  async getItems() {
    return this.api.get<{ items: T_CartItem[] }>(CART_BASE_URL)
  }
  static getQueryKeys() {
    return {
      getItems: "get-cart-item",
    }
  }
}
