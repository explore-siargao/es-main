import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import {
  dbLocations,
  dbPhotos,
  dbRentalAddOns,
  dbRentalDetails,
  dbRentalRates,
  dbRentals,
} from '@repo/database'
import { E_Rental_Category, E_Rental_Status } from '@repo/contract'
import { convertPrice } from '@/common/helpers/convert-price'
import {format} from "date-fns"
import { Z_Rental } from '@repo/contract-2/rental'
const response = new ResponseService()

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id
    const filteredDataGetAllRentals = await dbRentals
      .find({ host: hostId })
      .sort({ _id: -1 })
      .populate('photos')
      .populate('location')

    res.json(
      response.success({
        items: filteredDataGetAllRentals,
        allItemCount: filteredDataGetAllRentals.length,
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const addRental = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  } else {
    try {
      const details = new dbRentalDetails({
        engineCapacityLiter: null,
        engineCapacityCc: null,
        condition: '',
        exteriorColor: '',
        interiorColor: '',
        seatingCapacity: null,
        weightCapacity: null,
        minAgeReq: null,
        isRegistered: 'No',
      })

      const pricing = new dbRentalRates({
        dayRate: null,
        requiredDeposit: null,
        adminBookingCharge: null,
      })

      const addOns = new dbRentalAddOns({
        roofRack: false,
        babySeat: false,
        dashCam: false,
        others: '',
      })

      const photos = new dbPhotos({
        photos: null,
      })

      const location = new dbLocations({
        streetAddress: null,
        barangay: null,
        city: null,
        latitude: null,
        longitude: null,
        howToGetThere: '',
      })

      await Promise.all([
        details.save(),
        pricing.save(),
        addOns.save(),
        photos.save(),
        location.save(),
      ])

      const rental = new dbRentals({
        host: hostId,
        details: details._id,
        pricing: pricing._id,
        addOns: addOns._id,
        //photos: [photos._id],
        location: location._id,
        category: '',
        make: '',
        modelBadge: '',
        bodyType: null,
        fuel: null,
        transmission: null,
        year: '',
        qty: null,
        finishedSections: '',
        status: 'Incomplete',
        daysCanCancel: 0,
      })

      await rental?.save()

      res.json(
        response.success({
          item: rental,
          message: 'New rentals data successfully added',
        })
      )
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
}

export const getRentalDetails = async (req: Request, res: Response) => {
  const id = req.params.rentalId
  const hostId = res.locals.user?.id
  let rentalDetail = null

  try {
    const getRental = await dbRentals
      .findOne({ _id: id, host: hostId })
      .populate('details')
      .exec()

    if (!getRental) {
      res.json(response.error({ message: 'No rental details found' }))
    } else {
      const category = getRental?.category as unknown as string

      if (category === E_Rental_Category.Car) {
        rentalDetail = getRental?.details
      } else if ('Motorbike' === E_Rental_Category.Motorbike) {
        // FIX ANY HERE
        const details = getRental?.details as any
        rentalDetail = {
          // id: details._id,
          engineCapacityLiter: details.engineCapacityLiter,
          engineCapacityCc: details.engineCapacityCc,
          condition: details.condition,
          exteriorColor: details.exteriorColor,
          seatingCapacity: details.seatingCapacity,
          weightCapacityKg: details.weightCapacityKg,
          minAgeReq: details.minAgeReq,
          isRegistered: details.isRegistered,
        }
      } else if (category === E_Rental_Category.Bicycle) {
        // FIX ANY HERE
        const details = getRental?.details as any
        rentalDetail = {
          // id: details._id,
          condition: details.condition,
          exteriorColor: details.exteriorColor,
          weightCapacityKg: details.weightCapacityKg,
          minAgeReq: details.minAgeReq,
        }
      } else {
        res.json(response.error({ message: 'Invalid rental category' }))
      }

      res.json(response.success({ item: rentalDetail }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getRental = async (req: Request, res: Response) => {
  try {
    const rentalId = req.params.rentalId
    const hostId = res.locals.user?.id
    const rental = await dbRentals
      .findOne({ _id: rentalId, host: hostId })
      .populate({
        path: 'host',
        select: 'guest createdAt',
        populate: {
          path: 'guest',
          select: 'firstName lastName',
        },
      })
      .populate('details')
      .populate('photos')
      .populate('addOns')
      .populate('pricing')
      .populate('location')
      .exec()

    if (!rental) {
      res.json(
        response.error({
          message: 'Rental with given ID not found!',
        })
      )
    } else {
      res.json(
        response.success({
          item: rental,
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getRentalByIdPublic = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  try {
    const rentalId = req.params.rentalId
    const rental = await dbRentals
      .findOne({
        _id: rentalId,
        // status: E_Rental_Status.Pending,
      })
      .populate({
        path: 'host',
        select: 'email guest createdAt',
        populate: {
          path: 'guest',
          select: 'firstName middleName lastName address',
          populate: {
            path: 'address',
            model: 'Addresses',
          },
        },
      })
      .populate('details')
      .populate('photos')
      .populate('addOns')
      .populate('pricing')
      .populate('location')
      .populate({
        path: 'reviews',
        select:
          'reviewerId cleanlinessRates accuracyRates checkInRates communicationRates valueRates comment totalRates createdAt',
        populate: {
          path: 'reviewer',
          model: 'Users',
          select: 'email guest',
          populate: [
            {
              path: 'guest',
              select: 'firstName middleName lastName address',
              populate: {
                path: 'address',
                model: 'Addresses',
              },
            },
          ],
        },
      })
      .exec()

    if (!rental) {
      res.json(
        response.error({
          status: 404,
          message: 'Rental with given ID not found!',
        })
      )
    } else {
      let averageTotalRates: number
      let totalReviewCount: number
      let averageCleanlinessRates: number
      let averageAccuracyRates: number
      let averageCheckInRates: number
      let averageCommunicationRates: number
      let averageValueRates: number
      let averageLocationRates: number
      const newRental: any = rental.toObject()
      
      if (newRental.reviews && newRental.reviews.length > 0) {
        totalReviewCount = newRental.reviews.length
        averageTotalRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.totalRates,
            0
          ) / totalReviewCount

        averageCleanlinessRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.cleanlinessRates,
            0
          ) / totalReviewCount

        averageAccuracyRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.accuracyRates,
            0
          ) / totalReviewCount

        averageCheckInRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.checkInRates,
            0
          ) / totalReviewCount

        averageCommunicationRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.communicationRates,
            0
          ) / totalReviewCount

        averageValueRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.valueRates,
            0
          ) / totalReviewCount

        averageLocationRates =
          newRental.reviews.reduce(
            (sum: any, review: any) => sum + review.valueRates,
            0
          ) / totalReviewCount

        //@ts-ignore
        newRental.averageReviews = {
          totalReview: totalReviewCount,
          averageTotalRates: parseFloat(averageTotalRates.toFixed(2)),
          cleanliness: averageCleanlinessRates,
          accuracy: averageAccuracyRates,
          checkIn: averageCheckInRates,
          communication: averageCommunicationRates,
          value: averageValueRates,
          location: averageLocationRates,
        }
      }
      //@ts-ignore
      newRental.reviews = newRental.reviews?.map((item) => {
        //@ts-ignore
        const formatDate = format(new Date(item.createdAt), 'MMMM dd, yyyy')
        console.log(formatDate)
        return {
          ...item,
          createdAt: formatDate,
        }
      })
      newRental.pricing.dayRate =
        convertPrice(
          newRental.pricing.dayRate,
          preferredCurrency,
          conversionRates
        ) || 0
      newRental.pricing.requiredDeposit =
        convertPrice(
          newRental.pricing.requiredDeposit,
          preferredCurrency,
          conversionRates
        ) || 0
      newRental.pricing.adminBookingCharge =
        convertPrice(
          newRental.pricing.adminBookingCharge,
          preferredCurrency,
          conversionRates
        ) || 0
        
        const validRental = Z_Rental.safeParse(newRental)
        if(validRental.success){
      res.json(
        response.success({
          item: newRental,
        })
      )
    }else{
      console.error(validRental.error.message)
      res.json(response.error({message:"Invalid data of rentals"}))
    }
    }
  } catch (err: any) {
    res.json(
      response.error({
        status: 500,
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getAllRentalsByHostId = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id

    const filterRentals = await dbRentals.find({ host: hostId }).populate([
      {
        path: 'host',
        select: 'id email isHost',
        populate: {
          path: 'guest',
          select: 'id firstName lastName',
        },
      },
      {
        path: 'addOns',
        select: 'id roofRack boardRack babySeat dashCam includesHelmet others',
      },
      {
        path: 'pricing',
        select: 'id dayRate requiredDeposit',
      },
      {
        path: 'details',
        select:
          'id engineCapacityLiter engineCapacityCc condition exteriorColor interiorColor seatingCapacity weightCapacity minAgeReq isRegistered',
      },
      {
        path: 'photos',
      },
      {
        path: 'location',
        select:
          'id city streetAddress barangay longitude latitude howToGetThere',
      },
    ])

    res.json(response.success({ items: filterRentals }))
  } catch (err: any) {
    res.json(response.error({ message: err.message || UNKNOWN_ERROR_OCCURRED }))
  }
}

export const deleteRental = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const rentalId = req.params.rentalId
  try {
    const rental = await dbRentals.findOne({ _id: rentalId, deletedAt: null })

    if (!rental) {
      res.json(
        response.error({
          message: 'Rental not found or already deleted!',
        })
      )
    } else {
      if (rental?.host?.toString() !== userId) {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      } else {
        const updatedRental = await dbRentals.findOneAndUpdate(
          { _id: rentalId, host: userId, deletedAt: null },
          { deletedAt: Date.now() },
          { new: true }
        )

        res.json(
          response.success({
            item: updatedRental,
            message: 'Rental successfully deleted!',
          })
        )
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getRentalCounts = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id

    const motorbikeCount = await dbRentals.countDocuments({
      category: 'Motorbike',
      host: hostId,
      $and: [{ qtyIds: { $exists: true } }, { qtyIds: { $ne: [] } }],
    })

    const bicycleCount = await dbRentals.countDocuments({
      category: 'Bicycle',
      host: hostId,
      $and: [{ qtyIds: { $exists: true } }, { qtyIds: { $ne: [] } }],
    })

    const carCount = await dbRentals.countDocuments({
      category: 'Car',
      host: hostId,
      $and: [{ qtyIds: { $exists: true } }, { qtyIds: { $ne: [] } }],
    })

    res.json(
      response.success({
        item: {
          cars: carCount,
          motorbikes: motorbikeCount,
          bicycles: bicycleCount,
        },
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
