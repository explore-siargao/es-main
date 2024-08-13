import ModalContainer from "@/common/components/ModalContainer"
import WhereYouWillBe from "./WhereYouWillBe"
import SpecificMap from "@/common/components/SpecificMap"
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
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="full">
      <div className="md:grid grid-cols-12 h-[95vh]">
        <div className="md:col-span-4 lg:col-span-3 py-4 md:py-6">
          <WhereYouWillBe
            title="Where you'll be"
            locationDescription={locationDescription}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-9 justify-center items-center">
          <SpecificMap
            center={center}
            mapHeight="h-[25vh] md:h-[50vh] lg:h-[80vh]"
            mapWidth="w-full"
          />
        </div>
      </div>
    </ModalContainer>
  )
}

export default WhereYouWillBeModal
