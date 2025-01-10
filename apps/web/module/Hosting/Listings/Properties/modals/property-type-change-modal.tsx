import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import useChangeToHost from "@/common/hooks/use-change-to-host"
import { Spinner } from "@/common/components/ui/Spinner"

interface ISetUpProfileAboutYouModalProps {
  isModalOpen: boolean
  onClose: () => void
  onConfirmYes: () => void
  onConfirmNo: () => void
}

const PropertyTypeChangeModal = ({
  isModalOpen,
  onClose,
  onConfirmNo,
  onConfirmYes,
}: ISetUpProfileAboutYouModalProps) => {
  const { mutate, isPending } = useChangeToHost()
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isModalOpen}
      size="sm"
      title="Change Property Type"
    >
      <div className="py-4 px-6 flex flex-col divide-text-100 overflow-y-auto">
        <Typography variant="p" className="pt-2 pb-4">
          <i>
            Are you sure you want to change the property type? All data will be
            reset.
          </i>
        </Typography>
        <div className="flex items-center md:pt-4 bottom-0 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="secondary"
              className="min-w-20"
              onClick={onConfirmNo}
            >
              {isPending ? <Spinner size="sm">Loading...</Spinner> : "Cancel"}
            </Button>
            <Button
              variant="primary"
              className="min-w-20"
              onClick={onConfirmYes}
            >
              {isPending ? <Spinner size="sm">Loading...</Spinner> : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default PropertyTypeChangeModal
