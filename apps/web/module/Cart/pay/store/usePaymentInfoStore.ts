import { create } from "zustand"
import { T_CardInfo } from "@repo/contract"

type T_Main = T_CardInfo & {
  expirationDate: string
  paymentType: string
  paymentMethodId: number | string | null
  cardInfo: string
  cardType: string
  lastFour: string
}

type T_PaymentInfo_Action = {
  updatePaymentInfo: ({ key, value }: { key: string; value: string }) => void
}

const usePaymentInfoStore = create<T_Main & T_PaymentInfo_Action>((set) => ({
  paymentType: "",
  paymentMethodId: null,
  cardInfo: "",
  cardType: "",
  lastFour: "",
  cardholderName: "",
  cardNumber: "",
  cvv: "",
  expirationDate: "",
  expirationMonth: "",
  expirationYear: "",
  zipCode: "",
  country: "",
  updatePaymentInfo: ({ key, value }: { key: string; value: string }) =>
    set((state: T_Main & T_PaymentInfo_Action) => ({
      ...state,
      [key]: value,
    })),
}))

export default usePaymentInfoStore
