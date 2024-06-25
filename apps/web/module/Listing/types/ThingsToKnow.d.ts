export type T_HouseRules = {
  id: number
  icon: string
  rule: string
}


export type T_CancellationPolicies = {
  id: number
  rule: string
}

export type T_ThingsToKnowProps = {
  otherPolicies: T_HouseRules[]
  otherPoliciesModalData: string[]
  cancellationPolicies: T_CancellationPolicies[]
  cancellationModalData: string[]
}
