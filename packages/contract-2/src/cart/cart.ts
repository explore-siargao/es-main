import { ApiService } from "../common/services/api"
import { T_Add_To_Cart, T_Update_Cart, T_Cart_Item } from "./type"

const CART_BASE_URL = `/carts`

export class CartService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: T_Add_To_Cart) {
    return this.api.post(CART_BASE_URL, item)
  }
  async updateItem(itemId: string, item: T_Update_Cart) {
    return this.api.patch(`${CART_BASE_URL}/${itemId}`, item)
  }
  async removeItem(itemId: string) {
    return this.api.delete(`${CART_BASE_URL}/${itemId}`)
  }

  async removeMultipleItems(cartIds: string[]) {
    return this.api.delete(`${CART_BASE_URL}/remove-multiple`, cartIds)
  }

  async getItems() {
    return this.api.get<{ items: T_Cart_Item[] }>(CART_BASE_URL)
  }
  static getQueryKeys() {
    return {
      getItems: "get-cart-item",
    }
  }
}
