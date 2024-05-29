import toast from "react-hot-toast"
export enum WorkSpaceEnum {
  HOST = "host",
  GUEST = "guest",
}
export const setWorkspace = (role: WorkSpaceEnum) => {
  if (role === WorkSpaceEnum.HOST || role === WorkSpaceEnum.GUEST) {
    localStorage.setItem("workspace", role)
  } else {
    toast.error("Invalid role. Please specify 'host' or 'guest'.")
  }
}

export const getWorkSpace = () => {
  return localStorage.getItem("workspace")
}
