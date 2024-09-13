import { Dispatch } from "react"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import toast from "react-hot-toast"
import inputMaxLength from "@/common/helpers/inputMaxLength"
import useProfileEditStore from "../store/useProfileEditStore"

const PetsContent = ({ setIsOpen }: { setIsOpen: Dispatch<boolean> }) => {
  const { value: pets, onChange: handleInputChange } = inputMaxLength("", 40)
  const setPetsStore = useProfileEditStore((state) => state.setPets)
  const save = () => {
    if (pets) {
      setPetsStore(pets)
      setIsOpen(false)
      toast.success("Saved")
    } else {
      toast.error("Please fill out the form")
    }
  }
  return (
    <>
      <div className="p-5">
        <Typography variant="h2" className="font-semibold mb-5">
          Do you have any pets in your life?
        </Typography>
        <Typography variant="h5">
          Share any pets you have and their names. Example: My calico cat
          Whiskers, or Leonardo my speedy turtle.
        </Typography>

        <div className="mt-6">
          <Input label="Pets:" onChange={handleInputChange} maxLength={40} />
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {pets.length}/40 characters
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

export default PetsContent
