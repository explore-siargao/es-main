import { ApiService } from "../common/services/api"
import { E_Listing_Category } from "./enum"
import { T_Add_Wishlist, T_Wishlists } from "./type"

const WISHLIST_BASE_URL = `/wishlists`
export class WishlistService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addToWishlist(item: T_Add_Wishlist) {
    return this.api.post(
      `${WISHLIST_BASE_URL}/${item.category.toLowerCase()}`,
      item
    )
  }

  async getWishlist(category: E_Listing_Category, page: number = 1) {
    return this.api.get<{ items: T_Wishlists }>(
      `${WISHLIST_BASE_URL}/${category.toLowerCase()}?page=${page}`
    )
  }

  static getQueryKeys() {
    return {
      getWishlist: "get-wishlists",
    }
  }
}
