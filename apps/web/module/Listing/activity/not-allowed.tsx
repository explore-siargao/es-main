import { Typography } from "@/common/components/ui/Typography"
import { X } from "lucide-react"

const NotAllowed = ({ notAllowed }: { notAllowed: string[] }) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
      Not allowed
        </Typography>
        <div className="mb-5"></div>
        <div className="grid grid-cols-1 gap-4 w-full">
          {notAllowed?.map((item) => (
            <div className="flex gap-2">
              <X className="text-error-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
    </div>
  )
}

export default NotAllowed
