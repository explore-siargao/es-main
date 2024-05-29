import { Typography } from "@/common/components/ui/Typography"
import { AboutHostProps } from "../types/AboutHost"
import {
  LucideBookOpen,
  LucideBriefcase,
  LucideCake,
  LucideClock,
  LucideGlobe2,
  LucideGraduationCap,
  LucideHeart,
  LucideLanguages,
  LucideLightbulb,
  LucideMusic,
  LucidePawPrint,
  LucidePencil,
} from "lucide-react"
import { cn } from "@/common/helpers/cn"

const ABOUT_MAP = [
  {
    name: "school",
    icon: <LucideGraduationCap />,
    title: "Went to",
  },
  {
    name: "work",
    icon: <LucideBriefcase />,
    title: "Working as",
  },
  {
    name: "live",
    icon: <LucideGlobe2 />,
    title: "Lives in",
  },
  {
    name: "languageISpeak",
    icon: <LucideLanguages />,
    title: "Speak",
  },
  {
    name: "decadeWereBorn",
    icon: <LucideCake />,
    title: "Born from",
  },
  {
    name: "favoriteSong",
    icon: <LucideMusic />,
    title: "Favorite song is",
  },
  {
    name: "obsessedWith",
    icon: <LucideHeart />,
    title: "Obsessed with",
  },
  {
    name: "funFact",
    icon: <LucideLightbulb />,
    title: "Fun fact",
  },
  {
    name: "uselessSkill",
    icon: <LucidePencil />,
    title: "Useless skill",
  },
  {
    name: "biography",
    icon: <LucideBookOpen />,
    title: "Biography title",
  },
  {
    name: "spendTime",
    icon: <LucideClock />,
    title: "Spend time",
  },
  {
    name: "pets",
    icon: <LucidePawPrint />,
    title: "I have pet",
  },
]

const AboutHost = (props: AboutHostProps) => {
  return (
    <div>
      <Typography
        variant="h2"
        fontWeight="semibold"
        className="text-2xl hidden lg:block"
      >
        About {props.name}
      </Typography>
      {/* @ts-expect-error */}
      {props.aboutMe && (
        <div className="mt-2 lg:mt-6">
          {/* @ts-expect-error */}
          <Typography>{props.aboutMe}</Typography>
        </div>
      )}
      <div className={cn("lg:grid grid-cols-2 gap-4", "mt-2 lg:mt-6 mb-7")}>
        {ABOUT_MAP.map((item) => {
          // @ts-expect-error
          const value = props[item.name]
          return value ? (
            <div className="flex items-center gap-2" key={item.name}>
              {item.icon}
              <Typography variant="h4">
                {item.title} {value}
              </Typography>
            </div>
          ) : null
        })}
      </div>
      <Typography>{props.desc}</Typography>
    </div>
  )
}

export default AboutHost
