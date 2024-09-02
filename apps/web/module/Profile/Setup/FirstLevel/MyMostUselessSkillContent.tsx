import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import inputMaxLength from "@/common/helpers/inputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const MyMostUselessSkillContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>
}) => {
  const { value: uselessSkill, onChange: handleInputChange } = inputMaxLength(
    "",
    40
  )
  const setUselessSkillStore = useProfileEditStore(
    (state) => state.setMostUselessSkill
  )
  const save = () => {
    if (uselessSkill) {
      setUselessSkillStore(uselessSkill)
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
          What’s your most useless skill?
        </Typography>
        <Typography variant="h5">
          Share a surprising but pointless talent you have. Example: Shuffling
          cards with one hand.
        </Typography>

        <div className="mt-6">
          <Input
            label="My most useless skill:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {uselessSkill.length}/40 characters
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

export default MyMostUselessSkillContent
