import type { Metadata } from "next"

import "@/app/globals.css"
import QueryClientWrapper from "@/common/components/QueryClientWrapper"
import GlobalModalWrapper from "@/common/components/GlobalModalWrapper"
import { Toaster } from "react-hot-toast"
import React from "react"
import { LOGO_SINGLE_IMAGE } from "@/common/constants/index"
import { APP_NAME } from "@repo/constants"
import Header from "@/common/components/Header"
import Footer from "@/common/components/Footer"
import AuthStateProvider from "@/common/components/AuthStateProvider"
import SearchBar from "@/common/components/SearchBar"

export const metadata: Metadata = {
  title: APP_NAME,
  description: `Generated by ${APP_NAME}`,
}

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href={LOGO_SINGLE_IMAGE} />
      <body>
        <Toaster />
        <QueryClientWrapper>
          <AuthStateProvider>
            <GlobalModalWrapper>
              <div className="flex flex-col gap-2">
                <Header />
                <SearchBar />
              </div>
              <div className="min-h-screen">{children}</div>
              <Footer />
            </GlobalModalWrapper>
          </AuthStateProvider>
        </QueryClientWrapper>
      </body>
    </html>
  )
}
