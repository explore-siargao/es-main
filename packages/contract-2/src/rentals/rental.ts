import { ApiService } from "../common/services/api"
import { T_Rental_Additional_Info } from "./type"

const RENTAL_BASE_URL = `/rentals`

export class RentalService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }

  async getRental(rentalId: string) {
    return this.api.get(`${RENTAL_BASE_URL}/${rentalId}`)
  }

  async updateAdditionalInfo(rentalId: string, item: T_Rental_Additional_Info) {
    return this.api.patch(`${RENTAL_BASE_URL}/${rentalId}`, item)
  }

  static getQueryKeys() {
    return {
      getRental: "rental",
    }
  }
}
