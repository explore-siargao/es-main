import * as React from "react"
import { cn } from "@/common/helpers/cn"
import { VariantProps, cva } from "class-variance-authority"
const typographyVariants = cva("", {
  variants: {
    variant: {
      p: "text-base",
      h1: "text-2xl",
      h2: "text-xl",
      h3: "text-lg",
      h4: "text-base",
      h5: "text-sm",
      h6: "text-xs",
    },
    fontWeight: {
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
      thin: "font-thin",
      light: "font-light",
      extralight: "font-extralight",
    },
    capitalization: {
      uppercaseFirstLetter: "first-letter:uppercase",
    },
  },
  defaultVariants: {
    variant: "p",
    fontWeight: "normal",
    capitalization: "uppercaseFirstLetter",
  },
})
export interface TypographyProps
  extends React.DetailsHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof typographyVariants> {
  children: React.ReactNode
}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ variant, fontWeight, className, children }, ref) => {
    const Comp = variant ?? "p"
    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant, fontWeight, className }))}
      >
        {children}
      </Comp>
    )
  }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
