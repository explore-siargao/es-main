export type T_Rules = {
  id: number
  title: string
  description: string
}

export type T_HostInformationProps = {
  hostName: string
  hostProfilePic: string
  joinedIn: string
  countReviews: number
  rules: T_Rules[]
  responseRate: number
  responseTime: string
}
