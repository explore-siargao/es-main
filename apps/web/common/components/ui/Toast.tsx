import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/common/helpers/cn"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { Typography } from "./Typography"

const toastVariants = cva(
  "pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl",
  {
    variants: {
      variant: {
        default:
          "text-primary-700 bg-primary-200  border border-primary-500 shadow ring-1 ring-primary-500 ring-opacity-5",
        danger:
          "text-error-700 bg-error-200 border border-error-500 shadow ring-1 ring-error-500 ring-opacity-5",
        warning:
          "text-warning-700 bg-warning-100 border border-warning-500 shadow ring-1 ring-warning-500 ring-opacity-5",
        success:
          "text-success-700 bg-success-200  border border-success-500  shadow ring-1 ring-success-500 ring-opacity-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.DetailsHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  isOpen: boolean
  onClose: () => void
  tittle: string
  text?: string
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      children,
      isOpen = false,
      onClose,
      tittle,
      text,
      ...props
    },
    ref
  ) => {
    let iconComponent

    if (variant === "success") {
      iconComponent = <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
    } else if (variant === "warning") {
      iconComponent = (
        <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />
      )
    } else if (variant === "danger") {
      iconComponent = (
        <ExclamationCircleIcon className="h-6 w-6" aria-hidden="true" />
      )
    } else {
      iconComponent = (
        <QuestionMarkCircleIcon className="h-6 w-6" aria-hidden="true" />
      )
    }
    return (
      <div className={cn(toastVariants({ variant, className }))}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">{iconComponent}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <Typography className="text-sm font-medium ">{tittle}</Typography>
              <Typography className="mt-1 text-sm ">{text}</Typography>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast, toastVariants }
