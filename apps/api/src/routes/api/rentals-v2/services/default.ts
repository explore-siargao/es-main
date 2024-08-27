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
import { E_Rental_Category } from '@repo/contract'

const response = new ResponseService()

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id
    const filteredDataGetAllRentals = await dbRentals
      .find({ host: hostId })
      .sort({ _id: -1 })
      .populate('photos')
      .populate('location')

    return res.json(
      response.success({
        items: filteredDataGetAllRentals,
        allItemCount: filteredDataGetAllRentals.length,
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

export const addRental = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
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
    })

    await rental.save()

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
      return res.json(response.error({ message: 'No rental details found' }))
    }

    const category = getRental.category as unknown as string

    if (category === E_Rental_Category.Car) {
      rentalDetail = getRental.details
    } else if ('Motorbike' === E_Rental_Category.Motorbike) {
      // FIX ANY HERE
      const details = getRental.details as any
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
      const details = getRental.details as any
      rentalDetail = {
        // id: details._id,
        condition: details.condition,
        exteriorColor: details.exteriorColor,
        weightCapacityKg: details.weightCapacityKg,
        minAgeReq: details.minAgeReq,
      }
    } else {
      return res.json(response.error({ message: 'Invalid rental category' }))
    }

    res.json(response.success({ item: rentalDetail }))
  } catch (err: any) {
    return res.json(
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
      return res.json(
        response.error({
          message: 'Rental with given ID not found!',
        })
      )
    }

    return res.json(
      response.success({
        item: rental,
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
      return res.json(
        response.error({
          message: 'Rental not found or already deleted!',
        })
      )
    }

    if (rental.host?.toString() !== userId) {
      return res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    }

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
    const filteredDataGetAllRentals = await dbRentals
      .find({ host: hostId })
      .sort({ _id: -1 })
      .populate('photos')
      .populate('location')

    return res.json(
      response.success({
        items: filteredDataGetAllRentals,
        allItemCount: filteredDataGetAllRentals.length,
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
