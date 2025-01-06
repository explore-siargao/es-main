import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import { cn } from "@/common/helpers/cn"
import useGuestAdd from "../stores/use-guests-store"
import { MinusCircle, PlusCircle } from "lucide-react"
import toast from "react-hot-toast"

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
  const guest = useGuestAdd((state) => state.guest)
  const incrementGuest = useGuestAdd((state) => state.incrementGuest)
  const decrementGuest = useGuestAdd((state) => state.decrementGuest)
  const { adults, children, infants } = useGuestAdd((state) => state.guest)
  const updateGuests = ({type, category}: {type: 'increase' | 'decrease', category: 'adults' | 'children' | 'infants'}) => {
    const total = adults+children+infants;
    if(total > (maximumCapacity || 0)) {
      toast.error(`Exceeds capacity of ${maximumCapacity}`)
    } else {
      if(type === 'increase') {
        incrementGuest(category)
      }
      if(type === 'decrease') {
        decrementGuest(category)
      }
    }
  }
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
                if (adults > 1) updateGuests({ type: 'decrease', category: 'adults' })
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
                updateGuests({ type: 'increase', category: 'adults' })
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
                if (children > 0) updateGuests({ type: 'decrease', category: 'children' })
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
                updateGuests({ type: 'increase', category: 'children' })
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
                if (infants > 0) updateGuests({ type: 'decrease', category: 'infants' })
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
                updateGuests({ type: 'increase', category: 'infants' })
              }}
            >
              <PlusCircle className="h-8 w-8" strokeWidth={0.5} />
            </button>
          </div>
        </div>
        <Typography variant="h6" className="px-4 py-2">
          This place has a maximum of {maximumCapacity || 0} guests, not
          including infants. Pets aren't allowed.
        </Typography>
      </div>
    </ModalContainer>
  )
}

export default GuestAddModal
