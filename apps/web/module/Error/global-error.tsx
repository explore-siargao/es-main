import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { WidthWrapper } from "@/common/components/WidthWrapper"

const GlobalError = () => {
  return (
    <WidthWrapper width="medium">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Typography className="text-primary-500 text-6xl" fontWeight="bold">
          Oops!
        </Typography>
        <Typography className="max-w-sm text-center mt-6">
          The page you are looking for might be removed or temporarily
          unavailable.
        </Typography>
        <Button variant="primary" size="lg" className="uppercase mt-8">
          Go to homepage
        </Button>
      </div>
    </WidthWrapper>
  )
}

export default GlobalError
