import { LatLngTuple } from "leaflet"
import { Marker as LeafletMarker } from "react-leaflet"

const Marker = ({
  position,
}: {
  position: LatLngTuple
}) => {
  return (
    <LeafletMarker
      position={position}
    />
  )
}

export default Marker
