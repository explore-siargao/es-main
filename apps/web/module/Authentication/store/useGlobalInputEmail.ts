import { create } from "zustand"

type T_GlobalInputEmail = {
  email: string | null
  update: (email: string) => void
  remove: () => void
}

const useGlobalInputEmail = create<T_GlobalInputEmail>((set) => ({
  email: null,
  update: (email: string) => set(() => ({ email })),
  remove: () => set({ email: null }),
}))

export default useGlobalInputEmail
