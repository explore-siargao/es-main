import {
  E_ReservationStatus,
  T_Add_Reservations,
} from "@repo/contract-2/reservations"
import {
  dbActivities,
  dbGuests,
  dbProperties,
  dbRentals,
  dbReservations,
  dbUsers,
} from "@repo/database"

const seedReservations = async () => {
  try {
    console.log("Seeding reservations...")
    const rental1 = await dbRentals.findOne({ category: "Car" })
    const rental2 = await dbRentals.findOne({ category: "Motorbike" })
    const rental3 = await dbRentals.findOne({ category: "Bicycle" })
    const privateActivities = await dbActivities.find({
      experienceType: "Private",
    })
    const joinerActivities = await dbActivities.find({
      experienceType: "Joiner",
    })
    const property1 = await dbProperties
      .findOne({ type: "RESORT" })
      .populate("bookableUnits")
    const property2 = await dbProperties
      .findOne({ type: "HOMESTAY" })
      .populate("bookableUnits")
    const property3 = await dbProperties
      .findOne({ type: "HOSTEL" })
      .populate("bookableUnits")
    const reservationArray: T_Add_Reservations = [
      {
        rentalIds: {
          rentalId: String(rental1?._id),
          qtyIdsId: String(rental1?.qtyIds[0]?._id),
        },
        propertyIds: null,
        activityIds: null,
        startDate: "2024-12-09T00:00:00.000+00:00",
        endDate: "2024-12-10T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 1,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "John Doe",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: {
          rentalId: String(rental2?._id),
          qtyIdsId: String(rental2?.qtyIds[0]?._id),
        },
        propertyIds: null,
        activityIds: null,
        startDate: "2024-11-30T00:00:00.000+00:00",
        endDate: "2024-12-02T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 1,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "James Doe",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: {
          rentalId: String(rental3?._id),
          qtyIdsId: String(rental3?.qtyIds[0]?._id),
        },
        propertyIds: null,
        activityIds: null,
        startDate: "2024-12-05T00:00:00.000+00:00",
        endDate: "2024-12-07T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 1,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Jane Cortez",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: null,
        activityIds: {
          activityId: String(privateActivities[0]?._id),
          dayId: String(privateActivities[0]?.schedule.monday._id),
          timeSlotId: String(
            privateActivities[0]?.schedule.monday.slots[0]?._id
          ),
        },
        startDate: "2024-12-02T00:00:00.000+00:00",
        endDate: "2024-12-02T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 5,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Jim Yap",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: null,
        activityIds: {
          activityId: String(privateActivities[5]?._id),
          dayId: String(privateActivities[5]?.schedule.monday._id),
          timeSlotId: String(
            privateActivities[5]?.schedule.thursday.slots[0]?._id
          ),
        },
        startDate: "2024-12-05T00:00:00.000+00:00",
        endDate: "2024-12-05T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 10,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Jenny Lou",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: null,
        activityIds: {
          activityId: String(joinerActivities[0]?._id),
          dayId: String(joinerActivities[0]?.schedule.monday?._id),
          timeSlotId: String(
            joinerActivities[0]?.schedule?.monday?.slots[0]?._id
          ),
          slotIdsId: String(
             //@ts-ignore
            joinerActivities[0]?.schedule?.monday?.slots[0]?.slotIdsId[0]?._id
          ),
        },
        startDate: "2024-12-09T00:00:00.000+00:00",
        endDate: "2024-12-09T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 1,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Frits Reyes",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: null,
        activityIds: {
          activityId: String(joinerActivities[1]?._id),
          dayId: String(joinerActivities[1]?.schedule?.monday?._id),
          timeSlotId: String(
            joinerActivities[1]?.schedule?.monday?.slots[0]?._id
          ),
          slotIdsId: String(
            //@ts-ignore
            joinerActivities[1]?.schedule?.monday?.slots[0]?.slotIdsId[0]?._id
          ),
        },
        startDate: "2024-12-02T00:00:00.000+00:00",
        endDate: "2024-12-02T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 1,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Lyke Quinto",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: {
          propertyId: String(property1?._id),
          //@ts-ignore
          unitId: String(property1?.bookableUnits[0]?.qtyIds[0]?._id),
        },
        activityIds: null,
        startDate: "2024-12-01T00:00:00.000+00:00",
        endDate: "2024-12-05T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 5,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Conrad Dizon",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: {
          propertyId: String(property2?._id),
          //@ts-ignore
          unitId: String(property2?.bookableUnits[0]?.qtyIds[0]?._id),
        },
        activityIds: null,
        startDate: "2024-12-06T00:00:00.000+00:00",
        endDate: "2024-12-08T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 3,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Ramil Kaharian",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: {
          propertyId: String(property3?._id),
          //@ts-ignore
          unitId: String(property3?.bookableUnits[0]?.qtyIds[0]?._id),
        },
        activityIds: null,
        startDate: "2024-12-09T00:00:00.000+00:00",
        endDate: "2024-12-12T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.Confirmed,
        guestCount: 8,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: "Jake Mendoza",
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
      {
        rentalIds: null,
        propertyIds: {
          propertyId: String(property3?._id),
          //@ts-ignore
          unitId: String(property3?.bookableUnits[0]?.qtyIds[0]?._id),
        },
        activityIds: null,
        startDate: "2024-12-23T00:00:00.000+00:00",
        endDate: "2024-12-25T00:00:00.000+00:00",
        xendItPaymentMethodId: null,
        xendItPaymentReferenceId: null,
        xendItPaymentRequestId: null,
        status: E_ReservationStatus.OutOfServiceDates,
        guestCount: 0,
        cancellationDate: null,
        cancelledBy: null,
        guest: null,
        guestName: null,
        hostHavePenalty: false,
        paymentMethod: null,
        notes: null,
        createdAt: String(Date.now()),
        updatedAt: null,
        deletedAt: null,
      },
    ]
    await dbReservations.insertMany(reservationArray)
    console.log("Reservation seeded successfully!")
  } catch (error) {
    console.error("Error seeding reservations:", error)
  }
}

export default seedReservations
