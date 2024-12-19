import React from "react"
import { Check } from "lucide-react"
import { TitleSection } from "./title-section"
import { T_Rental } from "@repo/contract-2/rental"

const Requirements = ({ rental }: { rental: T_Rental }) => {
  return (
    <>
      <TitleSection size="lg" title="Requirements">
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
                Driver License
              </>
            )}
          </div>
        </div>
      </TitleSection>
    </>
  )
}

export default Requirements
