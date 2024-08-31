"use client"
import ErrorContent from "@/common/components/ErrorContent"

export default function GlobalError() {
  return (
    <html>
      <body>
        <ErrorContent mainError="500 - UNEXPECTED ERROR" errorDesc="The page you are looking for encountered an unexpected error." />
      </body>
    </html>
  )
}
