import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import inputMaxLength from "@/common/helpers/inputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const MyWorkContent = ({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) => {
  const { value: workName, onChange: handleInputChange } = inputMaxLength(
    "",
    20
  )
  const setWorkNameStore = useProfileEditStore((state) => state.setWorkName)
  const save = () => {
    if (workName) {
      setWorkNameStore(workName)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please fill out the form")
    }
  }

  return (
    <>
      <div className="px-5">
        <Typography variant="h2" className="font-semibold mb-2 mt-5">
          What do you do for work?
        </Typography>
        <Typography variant="h5" className="text-text-400">
          Tell us what your profession is. If you don’t have a traditional job,
          tell us your life’s calling. Example: Nurse, parent to four kids, or
          retired surfer.{" "}
          <button className="font-semibold underline">
            Where is this shown?
          </button>
        </Typography>

        <div className="mt-6 mb-5">
          <Input label="My work:" onChange={handleInputChange} maxLength={20} />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {workName.length}/20 characters
          </Typography>
        </div>
      </div>
      <div className="border-t" />
      <div className="flex items-end justify-end p-5">
        <Button size="lg" variant="primary" onClick={() => save()}>
          Save
        </Button>
      </div>
    </>
  )
}

export default MyWorkContent
