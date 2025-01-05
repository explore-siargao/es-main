import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useGuestsStore from "../stores/use-guests-store"
import { MinusCircle, PlusCircle } from "lucide-react"

interface GuestAddModalProps {
  isOpen: boolean
  onClose: () => void
  maximumCapacity?: number
}

const GuestAddModal = ({
  isOpen,
  onClose,
  maximumCapacity,
}: GuestAddModalProps) => {
  const guest = useGuestsStore((state) => state.guest)
  const incrementGuest = useGuestsStore((state) => state.incrementGuest)
  const decrementGuest = useGuestsStore((state) => state.decrementGuest)
  const { adults, children, infants } = useGuestsStore((state) => state.guest)
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="auto">
      <div className="py-2">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="space-y-0.5">
            <Typography variant="h4" fontWeight="semibold">
              Adults
            </Typography>
            <Typography variant="h5">Age 13+</Typography>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (adults > 1) decrementGuest("adults")
              }}
            >
              <MinusCircle
                className={cn(
                  `h-8 w-8`,
                  adults < 2 && "opacity-50 cursor-not-allowed"
                )}
                strokeWidth={0.5}
              />
            </button>
            <Typography variant="h5" fontWeight="semibold" className="mt-1">
              {guest.adults}
            </Typography>
            <button
              onClick={() => {
                incrementGuest("adults")
              }}
            >
              <PlusCircle className="h-8 w-8" strokeWidth={0.5} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 py-2">
          <div className="space-y-0.5">
            <Typography variant="h4" fontWeight="semibold">
              Children
            </Typography>
            <Typography variant="h5">Ages 2-12</Typography>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (children > 0) decrementGuest("children")
              }}
            >
              <MinusCircle
                className={cn(
                  `h-8 w-8`,
                  children < 1 && "opacity-50 cursor-not-allowed"
                )}
                strokeWidth={0.5}
              />
            </button>
            <Typography variant="h5" fontWeight="semibold" className="mt-1">
              {guest.children}
            </Typography>
            <button
              onClick={() => {
                incrementGuest("children")
              }}
            >
              <PlusCircle className="h-8 w-8" strokeWidth={0.5} />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 py-2">
          <div className="space-y-0.5">
            <Typography variant="h4" fontWeight="semibold">
              Infants
            </Typography>
            <Typography variant="h5">Under 2</Typography>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (infants > 0) decrementGuest("infants")
              }}
            >
              <MinusCircle
                className={cn(
                  `h-8 w-8`,
                  infants < 1 && "opacity-50 cursor-not-allowed"
                )}
                strokeWidth={0.5}
              />
            </button>
            <Typography variant="h5" fontWeight="semibold" className="mt-1">
              {guest.infants}
            </Typography>
            <button
              onClick={() => {
                incrementGuest("infants")
              }}
            >
              <PlusCircle className="h-8 w-8" strokeWidth={0.5} />
            </button>
          </div>
        </div>
        <Typography variant="h6" className="px-4 py-2">
          This place has a maximum of {maximumCapacity} guests, not including
          infants. Pets aren't allowed.
        </Typography>
      </div>
    </ModalContainer>
  )
}

export default GuestAddModal
