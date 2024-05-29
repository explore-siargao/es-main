"use client"
import React from "react"
type Props = {
  children: React.ReactNode
}
const Container = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center md:px-8 bg-primary-100 ">
      <div className="mx-auto w-full max-w-[480px] ">
        <div className="flex items-center bg-white shadow sm:rounded-2xl h-screen md:h-auto">
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Container
