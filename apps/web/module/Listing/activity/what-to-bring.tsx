import { Typography } from "@/common/components/ui/Typography"
import { Check } from "lucide-react"

const WhatToBring = ({ whatToBring }: { whatToBring: string[] }) => {
  return (
    <div>
      <Typography variant="h3" fontWeight="semibold">
        What to bring
      </Typography>
      <div className="mb-5"></div>
      <div className="grid grid-cols-1 gap-4 w-full">
        {whatToBring?.map((item) => (
          <div className="flex gap-2">
            <Check className="text-primary-700 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatToBring
