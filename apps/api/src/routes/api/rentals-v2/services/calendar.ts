import { ResponseService } from '@/common/service/response';
import { Request, Response } from 'express';
import { dbRentals } from '@repo/database';
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants';
import { E_Rental_Category, T_Reservation } from '@repo/contract';
import mongoose from 'mongoose';

const response = new ResponseService();

export const getCalendarRentals = async (req: Request, res: Response) => {
  const hostId = new mongoose.Types.ObjectId(res.locals.user?.id);
  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;
  const category = req.params.category;

  console.log("Request Params:", { hostId, fromDate, toDate, category });

  try {
    let rentalWithReservations = [];

    if (category === E_Rental_Category.Motorbike) {
      rentalWithReservations = await dbRentals.aggregate([
        {
          $match: {
            host: hostId,
            category: E_Rental_Category.Motorbike
          }
        },
        {
          $lookup: {
            from: 'rentals',
            localField: 'rentalId',
            foreignField: '_id',
            as: 'rental'
          }
        },
        {
          $unwind: {
            path: "$reservations",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "guests",
            localField: "reservations.guest",
            foreignField: "_id",
            as: "guestDetails"
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] } },
            price: { $first: "$pricing" },
            motorcycles: {
              $push: {
                abbr: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] },
                status: "$status",
                reservations: ["$reservations"]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            price: 1,
            motorcycles: 1
          }
        }
      ]);
    } else if ((category === E_Rental_Category.Car)) {
      rentalWithReservations = await dbRentals.aggregate([
        {
          $match: {
            host: hostId,
            category: E_Rental_Category.Car
          }
        },
        {
          $lookup: {
            from: 'rentalrates',
            localField: 'pricing', 
            foreignField: '_id',
            as: 'pricing'
          }
        },
        {
          $unwind: {
            path: "$pricing",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'reservations',
            localField: '_id',
            foreignField: 'rentalId',
            as: 'reservations'
          }
        },
        {
          $unwind: {
            path: "$reservations",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "guests",
            localField: "reservations.guest",
            foreignField: "_id",
            as: "guestDetails"
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] } },
            price: { $first: { $ifNull: ["$pricing.dayRate", "N/A"] } },
            cars: {
              $push: {
                abbr: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] },
                status: "$status",
                reservations: "$reservations"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            price: 1,
            cars: 1
          }
        }
      ]);
    }else {
      rentalWithReservations = await dbRentals.aggregate([
        {
          $match: {
            host: hostId,
            category: E_Rental_Category.Bicycle
          }
        },
        {
          $lookup: {
            from: 'reservations',
            localField: '_id',
            foreignField: 'rentalId',
            as: 'reservations'
          }
        },
        {
          $unwind: {
            path: "$reservations",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "guests",
            localField: "reservations.guest",
            foreignField: "_id",
            as: "guestDetails"
          }
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] } },
            price: { $first: "$pricing" },
            motorcycles: {
              $push: {
                abbr: { $concat: ["$year", " ", "$make", " ", "$modelBadge"] },
                status: "$status",
                reservations: ["$reservations"]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            price: 1,
            motorcycles: 1
          }
        }
      ]);
    }

    console.log("Host id", hostId);
    console.log("Rental with reservations", rentalWithReservations);

    if (!rentalWithReservations || rentalWithReservations.length === 0) {
      return res.json(response.error({ message: 'No rental details found' }));
    }

    const items = rentalWithReservations.map(rental => {
      if (category === E_Rental_Category.Motorbike) {
        return {
          name: rental.name,
          price: rental.price,
          motorcycles: rental.motorcycles
        };
      } else {
        return {
          name: rental.name,
          price: rental.price,
          cars: rental.cars
        };
      }
    });

    res.json(response.success({ items }));

  } catch (err: any) {
    console.error("Error occurred:", err);
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    );
  }
};
