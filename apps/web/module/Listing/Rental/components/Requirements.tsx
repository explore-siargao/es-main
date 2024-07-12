import React from "react"
import { Check } from "lucide-react"
import { TitleSection } from "./TitleSection"

const Requirements = ({ requirementData, group }: any) => {
  const { haveDriverLicense, requiredDeposit } = requirementData
  return (
    <>
      <TitleSection size="lg" title="Requirements">
        <div className="grid grid-cols-2">
          {requiredDeposit && requiredDeposit !== 0 && (
            <div className="flex my-3">
              <Check className="text-primary-500 mr-4 " /> Down payment required
            </div>
          )}
          <div className="flex my-3">
            {haveDriverLicense === "Yes" && (
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
