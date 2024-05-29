import { Typography } from "@/common/components/ui/Typography"
import React from "react"

interface Rules {
  id: number
  rule: string
}
interface TitleListsProps {
  title: string
  rules: Rules[]
}

const TitleLists = ({ title, rules }: TitleListsProps) => {
  return (
    <div>
      <Typography variant="h4" fontWeight="semibold">
        {title}
      </Typography>
      <ul>
        {rules.map((rule: any) => (
          <li className="mt-2" key={rule.rule.id}>
            <Typography>{rule.rule}</Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TitleLists
