import { ApiService } from "../common/services/api"
import { E_Status } from "./enum"
import { T_Add_Host_Approval, T_Update_Host_Approval } from "./type"

const HOST_APPROVAL_URL = `/host-approvals`

export class HostApprovalService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }

  async getItemsByHost(status?: E_Status) {
    return this.api.get(`${HOST_APPROVAL_URL}?status=${status}`)
  }

  async addHostApproval(item: T_Add_Host_Approval) {
    return this.api.post(HOST_APPROVAL_URL, item)
  }

  async updateHostApproval(item: T_Update_Host_Approval) {
    return this.api.patch(`${HOST_APPROVAL_URL}/${item.id}`, item)
  }

  async cancelHostApproval(id: string) {
    return this.api.delete(`${HOST_APPROVAL_URL}/${id}`)
  }

  static getQueryKeys() {
    return {
      getItemsByHost: "host-approvals",
    }
  }
}
