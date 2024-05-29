import { Typography } from "@/common/components/ui/Typography"
import useSessionStore from "@/common/store/useSessionStore"
import React from "react"

const PreferredCurrency = () => {
  const session = useSessionStore((state) => state)
  return (
    <div className="flex justify-between py-5">
      <div>
        <Typography variant="p">Preferred Currency</Typography>
        <Typography fontWeight="light">
          {session?.personalInfo?.currency}
        </Typography>
      </div>
      <button
        disabled
        className="underline self-start select-none disabled:opacity-40 text-sm"
      >
        Edit
      </button>
    </div>
  )
}

export default PreferredCurrency
