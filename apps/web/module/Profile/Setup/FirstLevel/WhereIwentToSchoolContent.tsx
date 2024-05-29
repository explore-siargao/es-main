import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import InputMaxLength from "../../../../common/helpers/InputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const WhereIWentToSchoolContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<boolean>
}) => {
  const { value: schoolName, onChange: handleInputChange } = InputMaxLength(
    "",
    40
  )
  const setSchoolNameStore = useProfileEditStore((state) => state.setSchoolName)
  const save = () => {
    if (schoolName) {
      setSchoolNameStore(schoolName)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please fill out the form")
    }
  }

  return (
    <>
      <div className="p-5">
        <Typography variant="h2" className="font-semibold mb-2">
          Where did you go to school?
        </Typography>
        <Typography variant="h5" className="text-text-400">
          Whether it’s home school, high school, or trade school, name the
          school that made you who you are.
        </Typography>
        <div className="mt-6">
          <Input
            label="Where I went to school:"
            onChange={handleInputChange}
            maxLength={40}
          />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {schoolName.length}/40 characters
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

export default WhereIWentToSchoolContent
