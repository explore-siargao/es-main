export type T_HouseRules = {
  id: number
  icon: string
  rule: string
}

export type T_SafetyProperties = {
  id: number
  rule: string
}

export type T_CancellationPolicies = {
  id: number
  rule: string
}

export type T_HouseRulesModalData = {
  id: number
  title: string
  iconDesc: T_HouseRules[]
}

export type T_RawSafetyModalData = {
  id: number
  icon: string
  safetyProperty: string
  otherDescription?: string
}

export type T_SafetyModalData = {
  id: number
  title: string
  iconDesc: T_RawSafetyModalData[]
}

export type T_RawCancellationModalData = {
  id: number
  cancellationPolicy: string
  otherDescription?: string
}

export type T_CancellationModalData = {
  id: number
  title: string
  desc: T_RawCancellationModalData[]
}

export type T_ThingsToKnowProps = {
  houseRules?: T_HouseRules[]
  safetyProperties: T_SafetyProperties[]
  cancellationPolicies: T_CancellationPolicies[]
  houseRulesModalData: T_HouseRulesModalData[]
  safetyModalData: T_SafetyModalData[]
  cancellationModalData: T_CancellationModalData[]
}
