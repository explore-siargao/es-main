import { ApiService } from "../common/services/api"
import { T_Carts } from "./type";

const CART_BASE_URL = `/api/cart`;

export class CartService {
  private api: ApiService;
  constructor(source: "main" | "auth" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addItem(item: { id: string; quantity: number }) {
    return this.api.post(CART_BASE_URL, item);
  }
  async updateItem(itemId: string, quantity: number) {
    return this.api.patch(`${CART_BASE_URL}/${itemId}`, { quantity });
  }
  async removeItem(itemId: string) {
    return this.api.delete(`${CART_BASE_URL}/${itemId}`);
  }
  async getItems() {
    return this.api.get<{items: T_Carts[]}>(CART_BASE_URL);
  }
  static getQueryKeys() {
    return {
      getItems: "get-cart-item"
    }
  }
}
