import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"

interface CheckoutBreakdownModalProps {
  isOpen: boolean
  onClose: () => void
}

const CheckoutBreakdownModal = ({
  isOpen,
  onClose,
}: CheckoutBreakdownModalProps) => {
  const breakdown = [
    { date: "2/12/2024", price: 25000 },
    { date: "2/13/2024", price: 25000 },
    { date: "2/14/2024", price: 25000 },
    { date: "2/15/2024", price: 25000 },
    { date: "2/16/2024", price: 25000 },
  ]

  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  })

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Basic Price Breakdown"
      onClose={onClose}
      size="auto"
    >
      <div className="p-5 md:w-80">
        {breakdown.map((data) => {
          return (
            <div className="flex justify-between mb-4">
              <Typography variant="h5">{data.date}</Typography>
              <Typography variant="h5">
                {moneyFormatter.format(data.price)}
              </Typography>
            </div>
          )
        })}
        <hr />
        <div className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Total Base Price
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            &#8369;125,000
          </Typography>
        </div>
      </div>
    </ModalContainer>
  )
}

export default CheckoutBreakdownModal
