import { prisma } from "./"

export const listingDescription = async () => {
  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })
  const createListingDescriptions = await prisma.listingDescription.createMany({
    data: [
      {
        generalDescription:
          "This home has peace of mind, relax with your whole family!",
        aboutGuestAccess: "",
        aboutSpace: "",
        listingId: getListings[0]?.id,
      },
      {
        generalDescription:
          "Private Paradise, Beach Front We can accomodate 2-12pax split over the 3 cottage style bedrooms.Additional bedding can be provided (no additional cost) to a maximum capacity of 2-4 a room if guest are willing to share bed/matress Note: For larger groups above 12pax we have a additional cottage rooms available, and pay upon arrival.. Transfer boat from car park to the beach is free of charge We have snorkeling equipment and booties for rent at the property 100pesos only Best wishes:)",
        aboutGuestAccess:
          "Guest have full access to the property, and use of the facility`s,",
        otherThingsNote:
          "Take note this time of pandemic we required every guest to have a medical certificate for our all safety requirements Thank you",
        aboutSpace:
          "Private Cottage bedrooms, situated on a private ocean front with green areas shaded by trees and palms. Great place to relax by the pool or with cushions on the lawn... Beach is sand/coral, more towards coral great for snorkelling, diving and swimming. Swim shoes are a must, and we have at the place and you can rent it for only 100pesos Great place to get away from the busy city.. set and relax Note: if you need a chef for hustle free pls let us know thank you :)",
        listingId: getListings[1]?.id,
      },
      {
        generalDescription:
          "Relax and unwind in our spacious and vibrant 55 sqm unit at Pico de Loro Beach & Country Club. Inspired by the nearby seascape, you will have a memorable vacation inside our spacious home. Pico de Loro is an exclusive beach club that requires membership to have access. Entrance fee is not yet included in the price. Unit is located at Jacana B.",
        aboutGuestAccess:
          "IMPORTANT! ADDITIONAL GUEST FEE The payment in Airbnb only covers the rental of the condominium unit. All guests must pay the entrance fee at the Guest Registration Area / Country Club Reception as per management rules. This is good for 7 consecutive days maximum. The wrist band will be replaced every day at the concierge of Beach Club or Country Club. Upon payment of the entrance fee, you may now be able to access the facilities and amenities of the resort.",
        aboutSpace:
          "This condominium unit has an open layout that makes it a spacious furnished unit with 1 king-sized, 1 queen-sized and 1 single beds for your comfortable stay. It is fully equipped with A/C, comfortable bed sheets and pillows. Feel free to store your personal stuff inside the built-in cabinets during your stay. The unit has a veranda with table and chairs where you can enjoy the mountain view and breath fresh air while socializing with your loved ones.",
        otherThingsNote:
          "Our ExploreSiargao can accommodate up to 6 people only. Any guests not accounted for in the initial booking shall not be permitted to stay.",
        listingId: getListings[2]?.id,
      },
      {
        generalDescription:
          "Escape to our beachfront oasis in Sibonga. Experience stunning ocean views, exclusive privacy, and comfortable accommodations. Book your stay now and enjoy the serenity of beachfront bliss.",
        aboutSpace:
          "Experience the ultimate beachfront getaway with friends and family in Sibonga. Our fenced beachfront house ensures the safety of our guests while providing a serene and memorable vacation. Here's why our property is the perfect choice for your retreat: 1. Secure: Our house offers ample parking space for at least four vehicles and is fenced all around to ensure the safety and privacy of our guests. 2. Bahay Kubo and Oceanfront Scenery: Unwind in our Bahay Kubo or tiki hut, an ideal spot for watching the sunrise, enjoying a morning coffee, or simply immersing yourself in the peaceful surroundings. The separate kitchenette allows you to indulge in meals while gazing through the kitchen window at the mesmerizing oceanfront scenery. 3. Master Bedroom Retreat: The master bedroom features a private bathroom with a hot and cold shower, providing utmost comfort and convenience. The highlight is the spacious terrace overlooking the ocean, where you can relax, enjoy the view, and stargaze at night, creating unforgettable memories with friends and family. 4. Comfortable and Air-Conditioned: All bedrooms in the house are air-conditioned, ensuring a comfortable stay for everyone. The 2nd and 3rd bedrooms share a bathroom, offering convenience for guests who stay in those rooms. 5. Welcoming Layout: The house features a well-designed layout that promotes a warm and inviting atmosphere. On the main floor, you'll find a bathroom and shower, providing additional convenience. The kitchen, dining area, and living room are thoughtfully arranged, allowing for easy interaction and connection between guests. 6. Convenient Location: Our property is conveniently situated within walking distance from the main road, providing easy access to public transportation. The nearby local public market offers fresh produce, while a 711 Store and Laundromat take care of your everyday needs. Discover the joy of a beachfront getaway that combines relaxation, mesmerizing oceanfront scenery, and a convenient location in Sibonga. Book your stay with us now for an unforgettable vacation.",
        aboutGuestAccess: "Entire house",
        otherThingsNote:
          "The house is situated in close proximity to the Cockpit Arena. On Sundays and holidays, there are scheduled cockfighting events taking place at the arena, which can lead to some noise disturbances between the hours of noon and 5 pm.",
        listingId: getListings[3]?.id,
      },
      {
        generalDescription:
          'Welcome to Amihan Coron! Charming units at the heart of Coron Town where you can vibe with your friends, family and nature. Take photos, make lasting memories with us as you explore the world famous "Enchanting Coron"',
        aboutGuestAccess: "",
        listingId: getListings[4]?.id,
      },
    ],
  })
  console.log({ createListingDescriptions })
}
