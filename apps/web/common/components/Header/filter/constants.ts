export type T_Filter_Type = {
  value: string
  label: string
}

export const locations: T_Filter_Type[] = [
  { value: "any", label: "Siargao Island (all)" },
  { value: "General Luna", label: "General Luna" },
  { value: "Dapa", label: "Dapa" },
  { value: "Del Carmen", label: "Del Carmen" },
  { value: "San Isidro", label: "San Isidro" },
  { value: "Pilar", label: "Pilar" },
  { value: "San Benito", label: "San Benito" },
  { value: "Burgos", label: "Burgos" },
  { value: "Santa Monica", label: "Santa Monica" },
  { value: "Socorro", label: "Socorro" },
]

export const vehicleTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Type" },
  { value: "car", label: "Car" },
  { value: "motorbike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
]

export const transmissionTypes: T_Filter_Type[] = [
  { value: "any_transmission", label: "Any Type" },
  { value: "Automatic", label: "Automatic" },
  { value: "Semi-Automatic", label: "Semi-Automatic" },
  { value: "Manual", label: "Manual" },
]

export const propertyTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Type" },
  { value: "hostel", label: "Hostel" },
  { value: "apartment", label: "Apartment" },
  { value: "homestay", label: "Homestay" },
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "bungalow", label: "Bungalow" },
  { value: "cottage", label: "Cottage" },
]

export const activityTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Type" },
  { value: "Island hopping", label: "Island Hopping" },
  { value: "Land tour", label: "Land Tour" },
  { value: "Surfing lessons", label: "Surfing Lessons" },
  { value: "Wakeboarding", label: "Wakeboarding" },
  { value: "Kite surfing", label: "Kite Surfing" },
  { value: "Scuba diving", label: "Scuba Diving" },
  { value: "Freediving", label: "Freediving" },
  { value: "Fishing", label: "Fishing" },
  { value: "ATV tour", label: "ATV Tour" },
]

export const experienceTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Type" },
  { value: "joiner", label: "Joiner" },
  { value: "private", label: "Private" },
]

export const durationTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Duration" },
  { value: "1", label: "1 Hour" },
  { value: "2", label: "2 Hours" },
  { value: "3", label: "3 Hours" },
  { value: "4", label: "4 Hours" },
  { value: "5", label: "5 Hours" },
  { value: "6", label: "6 Hours" },
  { value: "7", label: "7 Hours" },
]