import { Dispatch } from "react"
import React from "react"
import {
  LucideBookOpen,
  LucideBriefcase,
  LucideClock,
  LucideGlobe2,
  LucideGraduationCap,
  LucideHeart,
  LucideLanguages,
  LucideLightbulb,
  LucideMusic,
  LucidePawPrint,
  LucidePencil,
  LucidePlus,
} from "lucide-react"
import Section from "./Section"
import PetsContent from "./PetsContent"
import ObsessedWithContent from "./ObsessedWithContent"
import SpendTooMuchTimeContent from "./SpendTooMuchTimeContent"
import MyMostUselessSkillContent from "./MyMostUselessSkillContent"
import MyWorkContent from "./MyWorkContent"
import MyFunFactContent from "./MyFunFactContent"
import MyBiographyTitleContent from "./MyBiographyTitleContent"
import FavoriteSongInHighSchoolContent from "./FavoriteSongInHighSchoolContent"
import WhereIWentToSchoolContent from "./WhereIwentToSchoolContent"
import LanguageISpeakContent from "./LanguagesISpeakContent"
import WhereILiveContent from "./WhereILiveContent"
import DecadeYouWereBornContent from "./DecadeYouWereBornContent"

export type T_ModalContent = { setIsOpen: Dispatch<boolean> }

const menu = [
  {
    name: "school",
    icon: <LucideGraduationCap />,
    title: "Where I went to school",
    modalContent: (props: T_ModalContent) => (
      <WhereIWentToSchoolContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "work",
    icon: <LucideBriefcase />,
    title: "My work",
    modalContent: (props: T_ModalContent) => (
      <MyWorkContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "live",
    icon: <LucideGlobe2 />,
    title: "Where I live",
    modalContent: (props: T_ModalContent) => (
      <WhereILiveContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "languageISpeak",
    icon: <LucideLanguages />,
    title: "Languages you speak",
    modalContent: (props: T_ModalContent) => (
      <LanguageISpeakContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "decadeWereBorn",
    icon: <LucidePlus />,
    title: "Decade you were born",
    modalContent: (props: T_ModalContent) => (
      <DecadeYouWereBornContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "favoriteSong",
    icon: <LucideMusic />,
    title: "My favorite song in high school",
    modalContent: (props: T_ModalContent) => (
      <FavoriteSongInHighSchoolContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "obsessedWith",
    icon: <LucideHeart />,
    title: "I'm obsessed with",
    modalContent: (props: T_ModalContent) => (
      <ObsessedWithContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "funFact",
    icon: <LucideLightbulb />,
    title: "My fun fact",
    modalContent: (props: T_ModalContent) => (
      <MyFunFactContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "uselessSkill",
    icon: <LucidePencil />,
    title: "My most useless skill",
    modalContent: (props: T_ModalContent) => (
      <MyMostUselessSkillContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "biography",
    icon: <LucideBookOpen />,
    title: "My biography title would be",
    modalContent: (props: T_ModalContent) => (
      <MyBiographyTitleContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "spendTime",
    icon: <LucideClock />,
    title: "I spend too much time",
    modalContent: (props: T_ModalContent) => (
      <SpendTooMuchTimeContent setIsOpen={props.setIsOpen} />
    ),
  },
  {
    name: "pets",
    icon: <LucidePawPrint />,
    title: "Pets",
    modalContent: (props: T_ModalContent) => (
      <PetsContent setIsOpen={props.setIsOpen} />
    ),
  },
]

const FirstLevel = () => {
  return (
    <div className="lg:grid grid-cols-2 gap-x-10 md:grid grid-cols">
      {menu.map((item) => (
        <Section {...item} key={item.title} />
      ))}
    </div>
  )
}

export default FirstLevel
