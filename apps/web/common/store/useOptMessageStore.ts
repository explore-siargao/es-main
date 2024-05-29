import { create } from "zustand"
type T_Modal_Action = {
  isOpen: boolean
  setIsOpen: () => void
  setIsClose: () => void
}
const useOptMessageStore = create<T_Modal_Action>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: true })),
  setIsClose: () => set((state) => ({ isOpen: false })),
}))
export default useOptMessageStore
