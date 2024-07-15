import { Typography } from "@/common/components/ui/Typography"

const TitleLists = ({
  title,
  rules,
}: {
  title: string
  rules: string | string[]
}) => {
  const safeRules = typeof rules === "string" ? [rules] : rules

  return (
    <div>
      <Typography variant="h4" fontWeight="semibold">
        {title}
      </Typography>
      <ul>
        {safeRules.slice(0, 2).map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </div>
  )
}

export default TitleLists
