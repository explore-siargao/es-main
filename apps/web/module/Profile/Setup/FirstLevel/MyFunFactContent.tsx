import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import InputMaxLength from "@/common/helpers/InputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const MyFunFactContent = ({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) => {
  const { value: funFact, onChange: handleInputChange } = InputMaxLength("", 40)
  const setFunFactStore = useProfileEditStore((state) => state.setFunFact)
  const save = () => {
    if (funFact) {
      setFunFactStore(funFact)
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
          What’s a fun fact about you?
        </Typography>
        <Typography variant="h5">
          Share something unique or unexpected about you. Example: I was in a
          music video or I’m a juggler.
        </Typography>

        <div className="mt-6">
          <Input
            label="My fun fact:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {funFact.length}/40 characters
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

export default MyFunFactContent
