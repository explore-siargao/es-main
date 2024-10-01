"use client"
import { useEffect } from "react"
import ErrorContent from "@/common/components/ErrorContent"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <ErrorContent
      mainError="500 - UNEXPECTED ERROR"
      errorDesc="The page you are looking for encountered an unexpected error."
    />
  )
}
