import { Typography } from "@/common/components/ui/Typography"
import React from "react"

interface TitleListsProps {
  title: string
  rules: string[]
}

const TitleLists = ({ title, rules }: TitleListsProps) => {
  return (
    <div>
      <Typography variant="h4" fontWeight="semibold">
        {title}
      </Typography>
      <ul>
        {rules.slice(0, 2).map((rule: any) => (
          <li className="mt-2" key={rule}>
            <Typography>{rule}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TitleLists
