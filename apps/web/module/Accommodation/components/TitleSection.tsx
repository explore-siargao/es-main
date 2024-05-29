import React from "react"
import { Typography } from "@/common/components/ui/Typography"

export interface TitleSectionProps
  extends React.DetailsHTMLAttributes<HTMLDivElement> {
  size?: "md" | "lg"
  title: string
}
const TitleSection = React.forwardRef<HTMLDivElement, TitleSectionProps>(
  ({ className, children, title, size }) => {
    return (
      <div className={className}>
        <Typography variant={size === "lg" ? "h2" : "h3"} fontWeight="semibold">
          {title}
        </Typography>
        <div className="mt-2">{children}</div>
      </div>
    )
  }
)
TitleSection.displayName = "TitleSection"
export { TitleSection }
