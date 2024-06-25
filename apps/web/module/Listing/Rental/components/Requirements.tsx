import React from "react"
import { Check } from "lucide-react"
import { TitleSection } from "./TitleSection"

const Requirements = ({ requirementData, group }: any) => {
  const { minAgeReq, requiredDeposit } = requirementData
  return (
    <>
      <TitleSection size="lg" title="Requirements">
        <div className="grid grid-cols-2">
          {requiredDeposit ? (
            <div className="flex my-3">
              <Check className="text-primary-500 mr-4 " /> Down payment required
            </div>
          ) : null}
          <div className="flex my-3">
            <Check className="text-primary-500 mr-4 " /> Minimum age required{" "}
            {minAgeReq}
          </div>
        </div>
      </TitleSection>
    </>
  )
}

export default Requirements
