export function buildPropertySearchURL({
  location = "any",
  propertyType = "any",
  priceFrom = "any",
  priceTo = "any",
  bedroomCount = "any",
  bedCount = "any",
  bathroomCount = "any",
  facilities = "any",
  amenities = "any",
  starRating = "any",
  checkIn = "any",
  checkOut = "any",
  numberOfGuest = "any"
}) {
  const queryParts = [
    `location=${location}`,
    `propertyTypes=${propertyType}`,
    `priceFrom=${priceFrom}`,
    `priceTo=${priceTo}`,
    `bedroomCount=${bedroomCount}`,
    `bedCount=${bedCount}`,
    `bathroomCount=${bathroomCount}`,
    `facilities=${facilities}`,
    `amenities=${amenities}`,
    `starRating=${starRating}`,
    `checkIn=${checkIn}`,
    `checkOut=${checkOut}`,
    `numberOfGuest=${numberOfGuest}`
  ];

  return `/search/properties?${queryParts.join("&")}`;
}

export function buildActivitySearchURL({
  location = "any",
  activityType = "any",
  experienceType = "any",
  priceFrom = "any",
  priceTo = "any",
  duration = "any",
  starRating = "any",
  activityDate = "any",
  numberOfGuest = "any"
}) {
  const queryParts = [
    `location=${location}`,
    `activityTypes=${activityType}`,
    `experienceTypes=${experienceType}`,
    `priceFrom=${priceFrom}`,
    `priceTo=${priceTo}`,
    `durations=${duration}`,
    `starRating=${starRating}`,
    `activityDate=${activityDate}`,
    `numberOfGuest=${numberOfGuest}`
  ];

  return `/search/activities?${queryParts.join("&")}`;
}

export function buildRentalSearchURL({
  location = "any",
  vehicleType = "any",
  transmissionType = "any",
  priceFrom = "any",
  priceTo = "any",
  seatCount = "any",
  starRating = "any",
  pickUpDate = "any",
  dropOffDate = "any"
})  {
  const queryParts = [
    `location=${location}`,
    `vehicleTypes=${vehicleType}`,
    `transmissionTypes=${transmissionType}`,
    `priceFrom=${priceFrom}`,
    `priceTo=${priceTo}`,
    `seatCount=${seatCount}`,
    `starRating=${starRating}`,
    `pickUpDate=${pickUpDate}`,
    `dropOffDate=${dropOffDate}`
  ];

  return `/search/rentals?${queryParts.join("&")}`;
}