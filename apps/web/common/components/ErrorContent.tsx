import React from 'react'
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { LINK_HOME } from '../constants'

const ErrorContent = ({ mainError, errorDesc }: { mainError: string, errorDesc: string }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-10">
      <Typography variant="h1" className="text-primary-500 text-6xl" fontWeight="bold">
        Oh my wow!
      </Typography>
      <Typography variant="h3" className="max-w-sm text-center mt-6 font-bold uppercase">
        {mainError}
      </Typography>
      <Typography className="max-w-sm text-center mt-2">
        {errorDesc}
      </Typography>
      <Link href={LINK_HOME}>
        <Button variant="primary" size="lg" className="mt-8">
          Go to homepage
        </Button>
      </Link>
    </div>
  )
}

export default ErrorContent