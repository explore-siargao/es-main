import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"

interface CheckoutBreakdownModalProps {
  isOpen: boolean
  onClose: () => void
  breakdown?: { date: string; price: number }[]
  onTotalBasePriceCalculated?: (price: number) => void
}

const CheckoutBreakdownModal = ({
  isOpen,
  onClose,
  breakdown,
}: CheckoutBreakdownModalProps) => {
  const moneyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  })

  const totalBasePrice =
    breakdown?.reduce((total, item) => total + item.price, 0) ?? 0

  return (
    <ModalContainer
      isOpen={isOpen}
      title="Basic Price Breakdown"
      onClose={onClose}
      size="auto"
    >
      <div className="p-5 md:w-80">
        {breakdown?.map((data) => (
          <div className="flex justify-between mb-4" key={data.date}>
            <Typography variant="h5">{data.date}</Typography>
            <Typography variant="h5">
              {moneyFormatter.format(data.price)}
            </Typography>
          </div>
        ))}
        <hr />
        <div className="flex justify-between mt-4">
          <Typography variant="h5" fontWeight="bold">
            Total Base Price
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {moneyFormatter.format(totalBasePrice)}
          </Typography>
        </div>
      </div>
    </ModalContainer>
  )
}

export default CheckoutBreakdownModal
