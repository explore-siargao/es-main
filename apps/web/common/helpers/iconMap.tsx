import {
  LucideAlarmClock,
  LucideAlarmSmoke,
  LucideAngry,
  LucideBed,
  LucideBike,
  LucideBook,
  LucideBriefcase,
  LucideBuilding,
  LucideCalendarFold,
  LucideCamera,
  LucideCarFront,
  LucideCctv,
  LucideCheck,
  LucideChevronLeft,
  LucideCigaretteOff,
  LucideClock,
  LucideConciergeBell,
  LucideCopyright,
  LucideDumbbell,
  LucideFacebook,
  LucideFireExtinguisher,
  LucideFlag,
  LucideGavel,
  LucideGlobe,
  LucideHandCoins,
  LucideHeart,
  LucideHome,
  LucideInstagram,
  LucideKeyboard,
  LucideLanguages,
  LucideMapPin,
  LucideMedal,
  LucideMoon,
  LucidePawPrint,
  LucidePersonStanding,
  LucideSearch,
  LucideShield,
  LucideShieldCheck,
  LucideShirt,
  LucideSparkles,
  LucideSpeaker,
  LucideStar,
  LucideTentTree,
  LucideTv,
  LucideTwitter,
  LucideUpload,
  LucideUtensils,
  LucideWifi,
} from "lucide-react"

type LucideProps = {
  className?: string
  size?: string
}

export const iconMap = {
  book: (props?: LucideProps) => <LucideBook {...props} />,
  mapPin: (props?: LucideProps) => <LucideMapPin {...props} />,
  alarmClock: (props?: LucideProps) => <LucideAlarmClock {...props} />,
  alarmSmoke: (props?: LucideProps) => <LucideAlarmSmoke {...props} />,
  angry: (props?: LucideProps) => <LucideAngry {...props} />,
  bed: (props?: LucideProps) => <LucideBed {...props} />,
  carFront: (props?: LucideProps) => <LucideCarFront {...props} />,
  cigaretteOff: (props?: LucideProps) => <LucideCigaretteOff {...props} />,
  wiFi: (props?: LucideProps) => <LucideWifi {...props} />,
  building: (props?: LucideProps) => <LucideBuilding {...props} />,
  camera: (props?: LucideProps) => <LucideCamera {...props} />,
  ccTv: (props?: LucideProps) => <LucideCctv {...props} />,
  clock: (props?: LucideProps) => <LucideClock {...props} />,
  fireExtinguisher: (props?: LucideProps) => (
    <LucideFireExtinguisher {...props} />
  ),
  moon: (props?: LucideProps) => <LucideMoon {...props} />,
  pawPrint: (props?: LucideProps) => <LucidePawPrint {...props} />,
  personStanding: (props?: LucideProps) => <LucidePersonStanding {...props} />,
  speaker: (props?: LucideProps) => <LucideSpeaker {...props} />,
  chevronLeft: (props?: LucideProps) => <LucideChevronLeft {...props} />,
  medal: (props?: LucideProps) => <LucideMedal {...props} />,
  star: (props?: LucideProps) => <LucideStar {...props} />,
  flag: (props?: LucideProps) => <LucideFlag {...props} />,
  shieldCheck: (props?: LucideProps) => <LucideShieldCheck {...props} />,
  shield: (props?: LucideProps) => <LucideShield {...props} />,
  globe: (props?: LucideProps) => <LucideGlobe {...props} />,
  calendarFold: (props?: LucideProps) => <LucideCalendarFold {...props} />,
  upload: (props?: LucideProps) => <LucideUpload {...props} />,
  heart: (props?: LucideProps) => <LucideHeart {...props} />,
  keyboard: (props?: LucideProps) => <LucideKeyboard {...props} />,
  facebook: (props?: LucideProps) => <LucideFacebook {...props} />,
  twitter: (props?: LucideProps) => <LucideTwitter {...props} />,
  instagram: (props?: LucideProps) => <LucideInstagram {...props} />,
  copyRight: (props?: LucideProps) => <LucideCopyright {...props} />,
  search: (props?: LucideProps) => <LucideSearch {...props} />,
  check: (props?: LucideProps) => <LucideCheck {...props} />,
  wifi: (props?: LucideProps) => <LucideWifi {...props} />,
  sparkles: (props?: LucideProps) => <LucideSparkles {...props} />,
  tentTree: (props?: LucideProps) => <LucideTentTree {...props} />,
  dumbBell: (props?: LucideProps) => <LucideDumbbell {...props} />,
  utensils: (props?: LucideProps) => <LucideUtensils {...props} />,
  conciergeBell: (props?: LucideProps) => <LucideConciergeBell {...props} />,
  house: (props?: LucideProps) => <LucideHome {...props} />,
  bellConcierge: (props?: LucideProps) => <LucideConciergeBell {...props} />,
  bike: (props?: LucideProps) => <LucideBike {...props} />,
  shirt: (props?: LucideProps) => <LucideShirt {...props} />,
  briefCase: (props?: LucideProps) => <LucideBriefcase {...props} />,
  tv: (props?: LucideProps) => <LucideTv {...props} />,
  handCoins: (props?: LucideProps) => <LucideHandCoins {...props} />,
  languages: (props?: LucideProps) => <LucideLanguages {...props} />,
  gavel: (props?: LucideProps) => <LucideGavel {...props} />,
}
