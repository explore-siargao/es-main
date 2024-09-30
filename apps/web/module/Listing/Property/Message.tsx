import { WidthWrapper } from "@/common/components/Wrappers/WidthWrapper"
import ContactHost from "./components/ContactHost"
import CheckoutProcess from "./components/CheckoutBox"
import { LucideChevronLeft } from "lucide-react"
import Link from "next/link"

const Message = () => {
  return (
    <WidthWrapper width="small" className="mt-32 lg:mt-36">
      <div className="pb-10">
        <Link href="/accommodation/1">
          <LucideChevronLeft className="text-text-300 hover:text-text-500 transition" />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 pb-6">
        <div className="flex-1">
          <ContactHost
            hostName="Simon"
            listingName="Typically responds within an hour"
          />
        </div>
        <div className="md:w-96 md:relative">
          <div className="md:sticky md:top-0">
            <CheckoutProcess
              checkoutDesc={{
                id: 1,
                serviceFee: 1000,
                durationCost: 125000,
                descTotalBeforeTaxes: 3000,
                totalBeforeTaxes: 126000,
                titlePrice: 126000,
              }}
            />
          </div>
        </div>
      </div>
      <div className="divide-y"></div>
    </WidthWrapper>
  )
}

export default Message
