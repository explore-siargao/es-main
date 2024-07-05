
import IconDescription from "@/module/Listing/Rental/components/IconDescription"
import { TitleSection } from "@/module/Listing/Rental/components/TitleSection"
import { T_OffersCuisineProps } from "../types/OffersCuisine"

const OffersCuisine = ({ offers }: T_OffersCuisineProps) => {
  return (
    <>
      <TitleSection size="lg" title="Offers (Cuisine)">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2">
          {offers.map((item) => (
            <IconDescription {...item} />
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default OffersCuisine
