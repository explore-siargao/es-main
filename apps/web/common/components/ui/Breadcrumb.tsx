import * as React from "react"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Typography } from "./Typography"

export interface BreadcrumbProps
  extends React.DetailsHTMLAttributes<HTMLDivElement> {
  page: string
  pageLink?: string
  home: React.ReactNode
  link: string
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ page, home, link, pageLink }, ref) => {
    return (
      <div ref={ref} className="flex items-center text-text-400">
        <Link href={link} className="font-semibold hover:underline">
          {home}
        </Link>
        <ChevronRightIcon
          className="h-5 w-5 flex-shrink-0 mx-3"
          aria-hidden="true"
        />
        <Typography
          variant={"p"}
          fontWeight={"light"}
          className="cursor-pointer"
        >
          {page}
        </Typography>
      </div>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
