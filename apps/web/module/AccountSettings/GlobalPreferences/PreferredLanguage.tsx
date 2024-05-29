import { Typography } from "@/common/components/ui/Typography"
import useSessionStore from "@/common/store/useSessionStore"
import React from "react"

const PreferredLanguage = () => {
  const session = useSessionStore((state) => state)
  return (
    <div className="flex justify-between py-5">
      <div>
        <Typography variant="p">Preferred Language</Typography>
        <Typography fontWeight="light">
          {session?.personalInfo?.language}
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

export default PreferredLanguage
