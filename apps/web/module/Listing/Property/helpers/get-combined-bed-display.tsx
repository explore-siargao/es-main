import { T_Bed, T_BedRoom, T_LivingRoom } from "../types/AvailableBooking"

export const getCombinedBedDisplay = (
  bedRooms?: T_BedRoom[],
  livingRooms?: T_LivingRoom[]
): string => {
  const combinedBeds: T_Bed[] = [...(bedRooms || []), ...(livingRooms || [])]
    .flatMap((room) => room.beds || [])
    .reduce((acc: T_Bed[], bed: T_Bed) => {
      const existingBed = acc.find((item) => item.name === bed.name)
      if (existingBed) {
        existingBed.qty += bed.qty
      } else {
        acc.push({ name: bed.name, qty: bed.qty })
      }
      return acc
    }, [])

  return combinedBeds
    .filter((bed) => bed.qty > 0)
    .map((bed) => `${bed.qty} ${bed.name}`)
    .join(", ")
}
