import formatCurrency from "@/common/helpers/format-currency"
import { LatLngTuple, divIcon } from "leaflet"
import { ReactNode, useState } from "react"
import { Marker as LeafletMarker } from "react-leaflet"

const Marker = ({
  position,
  onClick,
  price,
  children,
}: {
  position: LatLngTuple
  onClick: () => void
  price: number
  children: ReactNode
}) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleMarkerClick = () => {
    setIsClicked((prev) => !prev)
    onClick()
  }

  const customIcon = divIcon({
    className: "custom-marker",
    html: `<div style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: ${isClicked ? "#828282" : "white"};
      border-radius: 15px;
      padding: 5px 10px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      font-weight: bold;
      color: ${isClicked ? "white" : "black"};
      text-align: center;
    ">${formatCurrency(price, { noDecimals: true })}</div>`,
    iconSize: [50, 30],
  })

  return (
    <LeafletMarker
      position={position}
      icon={customIcon}
      eventHandlers={{
        click: () => handleMarkerClick(), // Handle the marker click event
      }}
    >
      {children}
    </LeafletMarker>
  )
}

export default Marker
