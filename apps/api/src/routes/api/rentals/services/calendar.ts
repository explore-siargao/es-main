import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ResponseService } from '@/common/service/response'
import { dbProperties, dbRentals, dbReservations } from '@repo/database'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

// Define types
type Guest = {
  _id: mongoose.Types.ObjectId
  firstName: string
  lastName: string
}

type Reservation = {
  name: string // Ensure this is typed as Guest
  startDate: Date
  endDate: Date
  guestCount: number
  status: string
}

type Bicycle = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Car = {
  abbr: string
  status: string
  reservations: Reservation[]
}

type Item = {
  name: string
  price: string
  bicycles: Bicycle[]
}

const STATUS_DISPLAY = ["Out of service", "Blocked dates"];

// Function to check for date overlap
const hasDateConflict = (
  existingReservations: Reservation[],
  newReservation: Reservation
) => {
  return existingReservations.some((reservation) => {
    return (
      (newReservation.startDate >= reservation.startDate &&
        newReservation.startDate <= reservation.endDate) ||
      (newReservation.endDate >= reservation.startDate &&
        newReservation.endDate <= reservation.endDate) ||
      (newReservation.startDate <= reservation.startDate &&
        newReservation.endDate >= reservation.endDate)
    )
  })
}

export const getCarCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string);
  const endDate = new Date(req.query.endDate as string);

  try {
    const carRentals = await dbRentals
      .find({ category: 'Car', host: res.locals.user.id })
      .populate('pricing');

    if (!carRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No car rentals found.',
        })
      );
    }

    const allRentalIds = carRentals.flatMap((rental) =>
      rental.ids.map((idObj) => idObj._id)
    );

    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest');

      const reservationMap: Record<string, Reservation[]> = {};
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest;
        const reservationItem: Reservation = {
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.firstName} ${guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservation.status
        };
      
        if (!reservationMap[reservation.rentalId.toString()]) {
          reservationMap[reservation.rentalId.toString()] = [];
        }
        reservationMap[reservation.rentalId.toString()]?.push(reservationItem);
      });

    const items = carRentals.map((rental) => {
      const cars = rental.ids.map((idObj) => {
        const carReservations = reservationMap[idObj._id.toString()] || [];

        const isOccupied = carReservations.length > 0;

        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: isOccupied ? 'occupied' : 'available',
          reservations: carReservations,
        };
      });

      return {
        name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`,
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0,
        cars: cars.filter((car) => car.abbr !== 'Unknown'),
      };
    });

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Cars calendar fetched successfully.',
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    );
  }
};


export const getBikeCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string);
  const endDate = new Date(req.query.endDate as string);

  try {
    const bicycleRentals = await dbRentals
      .find({ category: 'Bicycle', host: res.locals.user.id })
      .populate('pricing');

    if (!bicycleRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No bicycle rentals found.',
        })
      );
    }

    const allRentalIds = bicycleRentals.flatMap((rental) =>
      rental.ids.map((idObj) => idObj._id)
    );

    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest'); 

      const reservationMap: Record<string, Reservation[]> = {};
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest;
        const reservationItem: Reservation = {
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.firstName} ${guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservation.status
        };
      
        if (!reservationMap[reservation.rentalId.toString()]) {
          reservationMap[reservation.rentalId.toString()] = [];
        }
        reservationMap[reservation.rentalId.toString()]?.push(reservationItem);
      });

    const items = bicycleRentals.map((rental) => {
      const bicycles = rental.ids.map((idObj) => {
        const bicycleReservations = reservationMap[idObj._id.toString()] || [];

   
        const isOccupied = bicycleReservations.length > 0;

        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: isOccupied ? 'occupied' : 'available',
          reservations: bicycleReservations,
        };
      });

      return {
        name: rental.make ?? 'Unknown',
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0,
        bicycles: bicycles.filter((bike) => bike.abbr !== 'Unknown'),
      };
    });

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Bicycle calendar fetched successfully.',
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    );
  }
};


export const getMotorcycleCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string);
  const endDate = new Date(req.query.endDate as string);

  try {
    const motorcycleRentals = await dbRentals
      .find({ category: 'Motorbike', host: res.locals.user.id })
      .populate('pricing');

    if (!motorcycleRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: 'No motorcycle rentals found.',
        })
      );
    }

    const allRentalIds = motorcycleRentals.flatMap((rental) =>
      rental.ids.map((idObj) => idObj._id)
    );

    const reservations = await dbReservations
      .find({
        rentalId: { $in: allRentalIds },
        $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
      })
      .populate('guest');

      const reservationMap: Record<string, Reservation[]> = {};
      reservations.forEach((reservation: any) => {
        const guest = reservation.guest;
        const reservationItem: Reservation = {
          name: STATUS_DISPLAY.includes(reservation.status)
            ? reservation.status
            : guest
              ? `${guest.firstName} ${guest.lastName}`
              : reservation.guestName || 'Unknown',
          startDate: reservation.startDate ?? new Date(),
          endDate: reservation.endDate ?? new Date(),
          guestCount: reservation.guestCount ?? 0,
          status: reservation.status
        };
      
        if (!reservationMap[reservation.rentalId.toString()]) {
          reservationMap[reservation.rentalId.toString()] = [];
        }
        reservationMap[reservation.rentalId.toString()]?.push(reservationItem);
      });

    const items = motorcycleRentals.map((rental) => {
      const motorcycles = rental.ids.map((idObj) => {
        const motorcycleReservations = reservationMap[idObj._id.toString()] || [];
        const isOccupied = motorcycleReservations.length > 0;

        return {
          id: idObj._id,
          abbr: idObj.name ? idObj.name : 'Unknown',
          status: isOccupied ? 'occupied' : 'available',
          reservations: motorcycleReservations,
        };
      });

      return {
        name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}` ?? 'Unknown',
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 0,
        motorcycles: motorcycles.filter((motor) => motor.abbr !== 'Unknown'),
      };
    });

    res.json(
      response.success({
        items,
        allItemCount: items.length,
        message: 'Motorcycle calendar fetched successfully.',
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || 'Unknown error occurred.',
      })
    );
  }
};



export const editChildName = async (req: Request, res: Response) => {
  const { id, name } = req.body
  try {
    const updateVehicle = await dbRentals.findOneAndUpdate(
      { 'ids._id': id },
      { $set: { 'ids.$.name': name } },
      { new: true }
    )
    if (!updateVehicle) {
      return res.json(response.error({ message: 'Rental vehicle not found' }))
    }
    return res.json(
      response.success({
        item: updateVehicle,
        message: 'Successfully changed rental vehicle name',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
