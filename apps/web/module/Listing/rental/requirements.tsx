import React from "react"
import { Check } from "lucide-react"
import { T_Rental } from "@repo/contract-2/rental"
import { Typography } from "@/common/components/ui/Typography"

const Requirements = ({ rental }: { rental: T_Rental }) => {
  return (
    <>
      <div>
        <Typography variant="h3" fontWeight="semibold">
          Requirements
        </Typography>
        <div className="mt-2">
          <div className="grid grid-cols-2">
            {rental.pricing?.requiredDeposit !== 0 && (
              <div className="flex my-3">
                <Check className="text-primary-500 mr-4 " /> Down payment required
              </div>
            )}
            <div className="flex my-3">
              {rental.details?.haveDriverLicense === "Yes" && (
                <>
                  <Check className="text-primary-500 mr-4" />
                  Driver license
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Requirements
