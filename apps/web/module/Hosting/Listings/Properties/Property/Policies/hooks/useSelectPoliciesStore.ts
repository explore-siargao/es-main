import { create } from "zustand"
import {
  ADDITIONAL_POLICY,
  PROPERTY_INFO,
  SAFETY,
  THINGS_TO_KNOW,
} from "../constants"
import { T_Property_Policy } from "@repo/contract"

type T_PolicyStoreState = {
  policies: T_Property_Policy[]
  updatePolicy: (value: T_Property_Policy) => void
  setDefaultPolicies: (value: T_Property_Policy[]) => void
}

const useSelectPoliciesStore = create<T_PolicyStoreState>((set) => ({
  policies: [
    ...THINGS_TO_KNOW,
    ...SAFETY,
    ...PROPERTY_INFO,
    ...ADDITIONAL_POLICY,
  ],
  updatePolicy: (value) =>
    set((state) => {
      let policyCurrStateCopy = [...state.policies]
      if (value.category !== "Additional Rules") {
        policyCurrStateCopy[value.index]!.isSelected = value.isSelected
        policyCurrStateCopy[value.index]!.reason = value.reason
      } else {
        policyCurrStateCopy[value.index]!.policy = value.policy
      }
      return {
        policies: policyCurrStateCopy,
      }
    }),
  setDefaultPolicies: (value) => {
    set((state) => {
      let stateCopy = [...state.policies]
      value?.forEach((policy) => {
        stateCopy[policy.index] = policy
      })
      return {
        policies: [...stateCopy],
      }
    })
  },
}))

export default useSelectPoliciesStore
