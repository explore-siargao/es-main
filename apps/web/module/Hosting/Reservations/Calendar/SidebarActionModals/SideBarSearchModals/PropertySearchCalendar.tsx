import { useState } from "react"
import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Input2 } from "@/common/components/ui/Input2"

interface ISearchCalendarProps {
  isModalOpen: boolean
  onClose: () => void
  searchString: string
  setSearchString: (searchString: string) => void
}

const PropertySearchCalendarModal = ({
  isModalOpen,
  onClose,
  searchString,
  setSearchString
}: ISearchCalendarProps) => {
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
      title="Search for Units"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <Input2
                type="text"
                label={"Enter unit name or keyword"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                description="Enter unit name you want to search"
                placeholder="e.g., Liwana Siargao Suites"
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

export default PropertySearchCalendarModal
