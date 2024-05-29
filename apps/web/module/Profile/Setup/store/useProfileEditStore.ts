import { FileWithPath } from "react-dropzone"
import { create } from "zustand"

export type T_ProfileEditStore = {
  school: string
  work: string
  favoriteSong: string
  obsessedWith: string
  decadeWereBorn: string
  funFact: string
  languageISpeak: string
  live: string
  uselessSkill: string
  biography: string
  spendTime: string
  pets: string
  aboutMe: string
  imageFile: FileWithPath | null
  imageKey: string | null
}

type T_ProfileEditStore_Actions = {
  setAboutMe: (value: string) => void
  setProfileImage: (value: FileWithPath | null) => void
  setProfileImageKey: (value: string) => void
  setSchoolName: (newSchoolName: string) => void
  setWorkName: (newWorkName: string) => void
  setFavoriteSong: (newFavoriteSong: string) => void
  setDecadeWereBorn: (newDecadeWereBorn: string) => void
  setObsessedWith: (newObsessedWith: string) => void
  setFunFact: (newFunFact: string) => void
  setLanguageISpeak: (newLanguageISpeak: string) => void
  setMostUselessSkill: (newMostUselessSkill: string) => void
  setBiography: (newBiography: string) => void
  setSpendTooMuchTime: (newSpendTooMuchTime: string) => void
  setPets: (newPets: string) => void
  setWhereILive: (newPets: string) => void
  setProfileEdit: (state: T_ProfileEditStore) => void
}

const useProfileEditStore = create<
  T_ProfileEditStore & T_ProfileEditStore_Actions
>((set) => ({
  aboutMe: "",
  imageFile: null,
  imageKey: null,
  live: "",
  school: "",
  work: "",
  favoriteSong: "",
  decadeWereBorn: "",
  obsessedWith: "",
  languageISpeak: "",
  funFact: "",
  uselessSkill: "",
  biography: "",
  spendTime: "",
  pets: "",
  setAboutMe: (value: string) => set({ aboutMe: value }),
  setProfileImage: (value: FileWithPath | null) => set({ imageFile: value }),
  setProfileImageKey: (value: string) => set({ imageKey: value }),
  setSchoolName: (newSchoolName: string) => {
    console.log("School:", newSchoolName)
    set(() => ({ school: newSchoolName }))
  },
  setWorkName: (newWorkName: string) => {
    console.log("Work:", newWorkName)
    set(() => ({ work: newWorkName }))
  },
  setFavoriteSong: (newFavoriteSong: string) => {
    console.log("Favorite song:", newFavoriteSong)
    set(() => ({ favoriteSong: newFavoriteSong }))
  },
  setDecadeWereBorn: (newDecadeWereBorn: string) => {
    console.log("Decade were born:", newDecadeWereBorn)
    set(() => ({ decadeWereBorn: newDecadeWereBorn }))
  },
  setObsessedWith: (newObsessedWith: string) => {
    console.log("Obsessed with:", newObsessedWith)
    set(() => ({ obsessedWith: newObsessedWith }))
  },
  setLanguageISpeak: (newLanguageISpeak: string) => {
    console.log("Languages I speak:", newLanguageISpeak)
    set(() => ({ languageISpeak: newLanguageISpeak }))
  },
  setFunFact: (newFunFact: string) => {
    console.log("Fun fact:", newFunFact)
    set(() => ({ funFact: newFunFact }))
  },
  setMostUselessSkill: (newMostUselessSkill: string) => {
    console.log("Most useless skill:", newMostUselessSkill)
    set(() => ({ uselessSkill: newMostUselessSkill }))
  },
  setBiography: (newBiography: string) => {
    console.log("Biography:", newBiography)
    set(() => ({ biography: newBiography }))
  },
  setSpendTooMuchTime: (newSpendTooMuchTime: string) => {
    console.log("I spend too much time:", newSpendTooMuchTime)
    set(() => ({ spendTime: newSpendTooMuchTime }))
  },
  setPets: (newPets: string) => {
    console.log("Pets:", newPets)
    set(() => ({ pets: newPets }))
  },
  setWhereILive: (newWhereILive: string) => {
    console.log("Where I live:", newWhereILive)
    set(() => ({ live: newWhereILive }))
  },
  setProfileEdit: (value: T_ProfileEditStore | undefined) => set({ ...value }),
}))

export default useProfileEditStore
