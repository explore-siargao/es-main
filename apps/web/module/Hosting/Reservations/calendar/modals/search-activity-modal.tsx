import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"

interface SearchActivityModalProps {
  isModalOpen: boolean
  onClose: () => void
  setSearchString: (searchString: string) => void
  inputDescription?: string
  inputPlaceholder?: string
  inputLabel?: string
}

const SearchActivityModal = ({
  isModalOpen,
  onClose,
  setSearchString,
  inputDescription,
  inputPlaceholder,
  inputLabel = "",
}: SearchActivityModalProps) => {
  const [value, setValue] = useState("")

  const handleConfirm = () => {
    setSearchString(value)
    onClose()
    setTimeout(() => {
      setValue("")
    }, 300)
  }

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Search for activity"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Input2
                type="text"
                label={inputLabel}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                description={inputDescription}
                placeholder={inputPlaceholder}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-2 w-full">
            <Button type="button" variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={() => setValue("")}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleConfirm()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SearchActivityModal
