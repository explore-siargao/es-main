"use client"
import React from "react"
import { Typography } from "./ui/Typography"
import { LucideArrowLeft, LucideX } from "lucide-react"
type Props = {
  children: React.ReactNode
  title: string
  onClose?: () => void
  onBack?: () => void
}
const AuthContainer = ({ children, title, onClose, onBack }: Props) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center md:px-8 bg-primary-100">
      <div className="mx-auto w-full max-w-[540px]">
        <div className="bg-white shadow sm:rounded-2xl h-screen md:h-auto">
          <div className="flex border-b-gray-200 border-b p-4">
            <div>
              {onClose ? (
                <LucideX
                  className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-300/30"
                  onClick={() => onClose()}
                />
              ) : null}
              {onBack ? (
                <LucideArrowLeft
                  className="h-6 w-6 cursor-pointer rounded-full hover:bg-gray-300/30"
                  onClick={() => onBack()}
                />
              ) : null}
            </div>
            <div className="flex-1">
              <Typography
                variant="p"
                className="w-full text-center place-self-center"
              >
                <span className={`${onClose || onBack ? "-ml-4" : ""}`}>
                  {title}
                </span>
              </Typography>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
