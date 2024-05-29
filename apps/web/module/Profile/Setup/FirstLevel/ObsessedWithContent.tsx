import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import InputMaxLength from "@/common/helpers/InputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const ObsessedWithContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>
}) => {
  const { value: obsessedWith, onChange: handleInputChange } = InputMaxLength(
    "",
    40
  )
  const setObsessedWithStore = useProfileEditStore(
    (state) => state.setObsessedWith
  )
  const save = () => {
    if (obsessedWith) {
      setObsessedWithStore(obsessedWith)
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
          What are you obsessed with?
        </Typography>
        <Typography variant="h5">
          Share whatever you can’t get enough of—in a good way. Example: Baking
          rosemary focaccia.
        </Typography>

        <div className="mt-6">
          <Input
            label="I'm obsessed with:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {obsessedWith.length}/40 characters
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

export default ObsessedWithContent
