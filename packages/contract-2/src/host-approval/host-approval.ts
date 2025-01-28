import { ApiService } from "../common/services/api"
import { T_Add_Host_Approval } from "./type"

const HOST_APPROVAL_URL = `/host-approvals`

export class HostApprovalService {
  private api: ApiService
  constructor(source: "main" | "mock" = "main") {
    this.api = new ApiService(source)
  }
  async addHostApproval(item: T_Add_Host_Approval) {
    return this.api.post(HOST_APPROVAL_URL, item)
  }
}
