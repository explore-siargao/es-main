import { Request, Response } from "express";
import mongoose from "mongoose";
import { ResponseService } from "@/common/service/response";
import { dbRentals, dbReservations } from "@repo/database";

const response = new ResponseService();

// Define types
type Guest = {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
};

type Reservation = {
  name: string; // Ensure this is typed as Guest
  startDate: Date;
  endDate: Date;
  guestCount: number;
};

type Bicycle = {
  abbr: string;
  status: string;
  reservations: Reservation[];
};

type Item = {
  name: string;
  price: string;
  bicycles: Bicycle[];
};

// Function to check for date overlap
const hasDateConflict = (existingReservations: Reservation[], newReservation: Reservation) => {
  return existingReservations.some(reservation => {
    return (
      (newReservation.startDate >= reservation.startDate &&
        newReservation.startDate <= reservation.endDate) ||
      (newReservation.endDate >= reservation.startDate &&
        newReservation.endDate <= reservation.endDate) ||
      (newReservation.startDate <= reservation.startDate &&
        newReservation.endDate >= reservation.endDate)
    );
  });
};

export const getBikeCalendar = async (req: Request, res: Response) => {
  const startDate = new Date(req.query.startDate as string)
  const endDate = new Date(req.query.endDate as string)
  try {
    // Step 1: Retrieve all bicycle rentals by host
    const bicycleRentals = await dbRentals.find({ category: "Bicycle", host:res.locals.user.id }).populate('pricing')
    .populate('pricing');

    if (!bicycleRentals.length) {
      return res.json(
        response.success({
          items: [],
          message: "No bicycle rentals found.",
        })
      );
    }

    // Extract all ids from bicycle rentals
    const allRentalIds = bicycleRentals.flatMap(rental => rental.ids);

    const reservations = await dbReservations.find({
      rentalId: { $in: allRentalIds },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ]
    }).populate("guest"); // Ensure guest field is populated

    // Step 3: Structure the data in the specified format
    const items: any = bicycleRentals.map((rental) => {
      const bicycles: Bicycle[] = rental.ids.map((id, index) => {
        const abbr = `${rental.make} ${index + 1}`;
        return {
          abbr,
          status: "available",
          reservations: [],
        };
      });

      // Step 4: Distribute reservations across bicycles
      reservations.forEach((reservation:any) => {
        if (reservation.guest) {
          const reservationItem: Reservation = {
            name: reservation?.guest.firstName +" "+reservation?.guest.lastName,
            startDate: reservation.startDate ?? new Date(),
            endDate: reservation.endDate ?? new Date(),
            guestCount: reservation.guestCount ?? 0,
          };

          for (let i = 0; i < bicycles.length; i++) {
            const bicycle = bicycles[i]; // Store the current bicycle in a local variable
            
            // Ensure the bicycle is not undefined
            if (bicycle) {
              const currentReservations = bicycle.reservations ?? []; // Ensure it's an array
              
              if (!hasDateConflict(currentReservations, reservationItem)) {
                bicycle.reservations.push(reservationItem); // Access the reservations array
                bicycle.status = "occupied"; // Update the status
                break; // Exit the loop after assigning
              }
            }
          }
        }
      });

      return {
        name: rental.make ?? 'Unknown', // Ensure name is always a string
        //@ts-ignore
        price: rental.pricing?.dayRate ?? 'N/A', // Ensure price is always a string
        bicycles,
      };
    });

    res.json(
      response.success({
        items,
        allItemCount:items.length,
        message: "Bicycle calendar fetched successfully.",
      })
    );
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message || "Unknown error occurred.",
      })
    );
  }
};
