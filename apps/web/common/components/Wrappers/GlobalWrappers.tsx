import React from "react"
import QueryClientWrapper from "@/common/components/Wrappers/QueryClientWrapper"
import GlobalModalWrapper from "@/common/components/Wrappers/GlobalModalWrapper"
import TimeZoneWrapper from "@/common/components/Wrappers/TimeZoneWrapper"
import AuthStateProviderWrapper from "@/common/components/Wrappers/AuthStateProviderWrapper"

const wrappers = [
  // Add your wrappers here
  QueryClientWrapper,
  AuthStateProviderWrapper,
  GlobalModalWrapper,
  TimeZoneWrapper,
]

// Wrapper component
const GlobalWrappers = ({ children }: { children: React.ReactNode }) => {
  // Recursively wrap the children with each wrapper
  return wrappers.reduceRight(
    (acc, WrapperComponent) => <WrapperComponent>{acc}</WrapperComponent>,
    children
  )
}

export default GlobalWrappers
