import ModalContainer from "@/common/components/ModalContainer"
import WhereYouWillBe from "./WhereYouWillBe"
import dynamic from "next/dynamic"
import { useMemo } from "react"

interface WhereYouWillBeModalProps {
  isOpen: boolean
  onClose: () => void
  center: [number, number]
  locationDescription?: string
}

const WhereYouWillBeModal = ({
  isOpen,
  onClose,
  center,
  locationDescription,
}: WhereYouWillBeModalProps) => {
  const DynamicModalMapWithPin = useMemo(() => dynamic(
    () => import('../../components/ModalMapWithPin'),
    {
        loading: () => <p>Loading...</p>,
        ssr: false
    }
  ), [isOpen])
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="full">
      <div className="md:grid grid-cols-12 h-[95vh]">
        <div className="md:col-span-4 lg:col-span-3 py-4 md:py-4">
          <WhereYouWillBe
            locationDescription={locationDescription}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-9 justify-center items-center">
          <DynamicModalMapWithPin
            center={center}
            disablePinMovement={true}
            scrollWheelZoomEnabled={true}
          />
        </div>
      </div>
    </ModalContainer>
  )
}

export default WhereYouWillBeModal
