export type T_Filter_Type = {
  value: string
  label: string
}

export const locations: T_Filter_Type[] = [
  { value: "any", label: "Siargao island (all)" },
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
  { value: "any", label: "Any type" },
  { value: "car", label: "Car" },
  { value: "motorbike", label: "Motorbike" },
  { value: "bicycle", label: "Bicycle" },
]

export const transmissionTypes: T_Filter_Type[] = [
  { value: "any", label: "Any Type" },
  { value: "Automatic", label: "Automatic" },
  { value: "Semi-Automatic", label: "Semi-Automatic" },
  { value: "Manual", label: "Manual" },
]

export const propertyTypes: T_Filter_Type[] = [
  { value: "any", label: "Any type" },
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
  { value: "any", label: "Any type" },
  { value: "Island hopping", label: "Island hopping" },
  { value: "Land tour", label: "Land tour" },
  { value: "Surfing lessons", label: "Surfing lessons" },
  { value: "Wakeboarding", label: "Wakeboarding" },
  { value: "Kite surfing", label: "Kite surfing" },
  { value: "Scuba diving", label: "Scuba diving" },
  { value: "Freediving", label: "Freediving" },
  { value: "Fishing", label: "Fishing" },
  { value: "ATV tour", label: "ATV tour" },
]

export const experienceTypes: T_Filter_Type[] = [
  { value: "any", label: "Any type" },
  { value: "joiner", label: "Joiner" },
  { value: "private", label: "Private" },
]

export const durationTypes: T_Filter_Type[] = [
  { value: "any", label: "Any duration" },
  { value: "1", label: "1 hour" },
  { value: "2", label: "2 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
  { value: "5", label: "5 hours" },
  { value: "6", label: "6 hours" },
  { value: "7", label: "7 hours" },
]