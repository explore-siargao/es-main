import { create } from "zustand"

type T_Modal = {
  modal: string | null
  setModal: (modal: string | null) => void
}

export const useModalStore = create<T_Modal>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
}))
