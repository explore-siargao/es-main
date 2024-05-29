import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { useState } from "react"
import useProfileEditStore from "../../Setup/store/useProfileEditStore"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: () => void
}

const SetUpProfileAboutYouModal = ({
  isModalOpen,
  onClose,
}: ISetUpProfileAboutYouModalProps) => {
  const currentValue = useProfileEditStore((state) => state.aboutMe)
  const setInputValue = useProfileEditStore((state) => state.setAboutMe)
  const [value, setValue] = useState("")
  const saveInputValue = () => {
    setInputValue(value)
    onClose()
  }

  return (
    <ModalContainer onClose={onClose} isOpen={isModalOpen} size="sm">
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <Typography variant="h2" fontWeight="semibold">
          About you
        </Typography>
        <Typography variant="h5" className="mt-4">
          Tell us a little bit about yourself, so your future hosts or guests
          can get to know you.
        </Typography>
        <Typography>
          <textarea
            className="p-2 border border-gray-300 rounded-md w-full h-32 mt-7"
            defaultValue={currentValue}
            onChange={(e) => {
              const inputValue = e.target.value
              if (inputValue.length <= 450) {
                setValue(inputValue)
              }
            }}
          />
        </Typography>

        <div className="flex justify-end pt-1">
          <Typography
            variant="h6"
            className="flex items-end justify-end font-semibold text-text-400 mt-3"
          >
            {value.length}/450 characters
          </Typography>
        </div>
      </div>
      <div className="flex items-center p-4 md:p-5 bottom-0 border-t border-gray-200 rounded-b">
        <div className="flex justify-between w-full">
          <Button
            variant="default"
            className="ml-auto"
            onClick={() => saveInputValue()}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SetUpProfileAboutYouModal
