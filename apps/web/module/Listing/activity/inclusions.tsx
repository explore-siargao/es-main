import { Check, X } from "lucide-react"
import { Typography } from "@/common/components/ui/Typography"

const Inclusions = ({
  isFoodIncluded,
  isNonAlcoholicDrinkIncluded,
  isAlcoholicDrinkIncluded,
  otherInclusion,
  notIncluded,
}: {
  isFoodIncluded: boolean
  isNonAlcoholicDrinkIncluded: boolean
  isAlcoholicDrinkIncluded: boolean
  otherInclusion: string[]
  notIncluded: string[]
}) => {
  return (
    <>
        <Typography variant="h3" fontWeight="semibold">
          Inclusions
        </Typography>
        <div className="mb-5"></div>
        <div className="grid grid-cols-3 gap-4 w-full">
          {isFoodIncluded && (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Food
            </div>
          )}
          {isNonAlcoholicDrinkIncluded && (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Non-alcoholic Drinks
            </div>
          )}
          {isAlcoholicDrinkIncluded && (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              Non-alcoholic Drinks
            </div>
          )}

          {otherInclusion?.map((item) => (
            <div className="flex gap-2">
              <Check className="text-primary-700 shrink-0" />
              {item}
            </div>
          ))}
          {notIncluded?.map((item) => (
            <div className="flex gap-2">
              <X className="text-error-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
    </>
  )
}

export default Inclusions
