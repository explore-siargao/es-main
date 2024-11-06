import pluralize from "pluralize";
import { ApiService } from "../common/services/api"
import { T_Category_Highest_Price } from "./type"
import { E_Listing_Category } from '@repo/contract';
import { API_ROOT } from "@repo/constants";

export class FilterService {
  private api: ApiService
  constructor(source: "main" | "auth" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async getCategoryHighestPrice({ category }: { category: E_Listing_Category }) {
    return this.api.get<{ item: T_Category_Highest_Price }>(`/${pluralize(category).toLocaleLowerCase()}/highest-price`)
  }
  static getQueryKeys() {
    return {
      rentalsHighestPrice: "rentals-highest-price",
      activitiesHighestPrice: "activities-highest-price",
      propertiesHighestPrice: "properties-highest-price",
    }
  }
}
