import { Typography } from "@/common/components/ui/Typography"
import { LucideShield, ShieldCheck, Star, Medal } from "lucide-react"
import { Button } from "@/common/components/ui/Button"
import { APP_NAME } from "@repo/constants"
import AvatarTitleDescription from "../avatar-title-description"
import { useRouter } from "next/navigation"
import { T_HostInformationProps } from "./types/HostInformation"

const HostInformation = ({
  hostName,
  hostProfilePic,
  joinedIn,
  countReviews,
  rules,
  responseRate,
  responseTime,
}: T_HostInformationProps) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 md:items-center">
      <div className="flex-1 flex flex-col">
        <AvatarTitleDescription
          avatarKey={hostProfilePic}
          title={`Hosted by ${hostName}`}
          subTitle={`Joined in ${joinedIn}`}
        />
        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="text-sm">{countReviews} Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm">Identity verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4" />
            <span className="text-sm">Superhost</span>
          </div>
        </div>
        {rules.map((info) => (
          <div className="flex mt-6" key={info.id}>
            <div>
              <Typography variant="h3" fontWeight="semibold">
                {info.title}
              </Typography>
              <div className="mt-2">
                <Typography>{info.description}</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Typography>Response Rate: {responseRate}%</Typography>
        <Typography>Response Time: {responseTime}</Typography>
        <Button
          variant="outline"
          className="my-6"
          onClick={() => router.push("/accommodation/1/message")}
        >
          Contact Host
        </Button>
        <div>
          <div className="flex gap-4 items-center">
            <LucideShield className="fill-red-100 text-red-400 h-14 w-14" />
            <span className="text-sm">
              {`To protect your payment never transfer money or communicate outside of the ${APP_NAME} website or app.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostInformation
