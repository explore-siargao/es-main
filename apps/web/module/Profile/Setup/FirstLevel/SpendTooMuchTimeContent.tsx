import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import inputMaxLength from "@/common/helpers/inputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const SpendTooMuchTimeContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>
}) => {
  const { value: spendTooMuchTime, onChange: handleInputChange } =
    inputMaxLength("", 40)
  const setSpendTooMuchTimeStore = useProfileEditStore(
    (state) => state.setSpendTooMuchTime
  )
  const save = () => {
    if (spendTooMuchTime) {
      setSpendTooMuchTimeStore(spendTooMuchTime)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please fill out the form")
    }
  }
  return (
    <div>
      <div className="p-5">
        <Typography variant="h2" className="font-semibold mb-5">
          What do you spend too much time doing?
        </Typography>
        <Typography variant={"h5"}>
          Share an activity or hobby you spend lots of free time on. Example:
          Watching cat videos or playing chess.
        </Typography>

        <div className="mt-6">
          <Input
            label="I spend too much time:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {spendTooMuchTime.length}/40 characters
          </Typography>
        </div>
      </div>
      <div className="border-t" />
      <div className="flex items-end justify-end p-5">
        <Button size="lg" variant="primary" onClick={() => save()}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default SpendTooMuchTimeContent
