import { Typography } from "@/common/components/ui/Typography"
import { LanguagesIcon } from "lucide-react"

const Languages = ({ languages }: { languages: string[] }) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        Languages
      </Typography>
      <div className="mb-5"></div>
      <div className="grid grid-cols-1 gap-4 w-full">
        {languages?.map((item) => (
          <div className="flex gap-2">
            <LanguagesIcon className="text-primary-700 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Languages
