import React from "react"

interface YMarginWrapperProps {
  children: React.ReactNode
  role?: "host" | "guest"
}

const roleMap = {
  host: "mt-64",
  guest: "mt-[18.2rem]",
}

const YMarginWrapper = React.forwardRef<HTMLDivElement, YMarginWrapperProps>(
  ({ children, role = "guest" }, ref) => {
    return (
      <div ref={ref} className={roleMap[role]}>
        {children}
      </div>
    )
  }
)

YMarginWrapper.displayName = "YMarginWrapper"

export default YMarginWrapper
