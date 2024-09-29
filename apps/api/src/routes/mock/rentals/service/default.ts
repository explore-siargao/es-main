import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { rentals } from './jsons/rentals'

const response = new ResponseService()

export const addRental = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const firstName = res.locals.user?.firstName
  const lastName = res.locals.user?.lastName
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const rentalsData = {
    id: rentals.length + 1,
    hostId: hostId,
    Host: {
      id: hostId,
      firstName: firstName,
      lastName: lastName,
    },
    category: '',
    make: '',
    modelBadge: '',
    bodyType: '',
    fuel: null,
    transmission: null,
    year: '',
    Photos: [],
    Location: {
      id: null,
      street: null,
      barangay: null,
      city: null,
      latitude: null,
      longitude: null,
      howToGetThere: '',
    },
    Details: {
      id: 4,
      engineCapacityLiter: null,
      engineCapacityCc: null,
      condition: '',
      exteriorColor: '',
      interiorColor: '',
      seatingCapacity: null,
      weightCapacity: null,
      minAgeReq: null,
      isRegistered: 'No',
    },
    AddOns: {
      roofRack: false,
      babySeat: false,
      dashCam: false,
      others: '',
    },
    Pricing: {
      id: 4,
      dayRate: null,
      requiredDeposit: null,
    },
    finishedSections: [],
    status: 'Incomplete',
  }

  //@ts-ignore
  rentals.push(rentalsData)
  res.json(
    response.success({
      item: rentalsData,
      message: 'New rentals data successfully added',
      allItemCount: rentals.length,
    })
  )
}

export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id
    const filteredDataGetAllRentals = rentals
      .filter((rental) => rental?.hostId === hostId)
      .reverse()

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

export const getAllRentalsByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id

  const filterRentals = rentals.filter((rental) => rental?.hostId === hostId)

  res.json(
    response.success({
      items: filterRentals,
    })
  )
}

export const getRental = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.rentalId)
    const hostId = res.locals.user?.id
    const rental = rentals.find(
      (rental) => rental?.id === id && hostId === rental?.hostId
    )

    if (!rental) {
      res.json(
        response.error({
          message: 'Rental with given ID not found!',
        })
      )
    }

    res.json(
      response.success({
        item: rental,
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

export const updateRentals = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = Number(req.params.rentalId)
    const updateData = req.body

    const rentalIndex = rentals.findIndex(
      (rental) => rental?.id === id && rental?.hostId === hostId
    )

    if (rentalIndex === -1) {
      res.json(
        response.error({
          message: 'Rental with given ID not found!',
        })
      )
    }

    rentals[rentalIndex] = { ...rentals[rentalIndex], ...updateData }

    const updatedRental = rentals[rentalIndex]

    if (updatedRental) {
      const updatedRentalData = {
        id: updatedRental.id,
        category: updatedRental.category,
        make: updatedRental.make,
        modelBadge: updatedRental.modelBadge,
        bodyType: updatedRental.bodyType,
        fuel: updatedRental.fuel,
        transmission: updatedRental.transmission,
        year: updatedRental.year,
      }

      res.json(
        response.success({
          message: 'Rental updated successfully!',
          item: updatedRentalData,
        })
      )
    } else {
      res.json(
        response.error({
          message: 'Error updating rental!',
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

export const editPhotoInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const id = Number(req.params.rentalId)
  const photoId = Number(req.params.photoId)
  const { tag, description } = req.body
  if (!tag && !description) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  try {
    const getrental = rentals.find(
      (item) => item.id === id && item.hostId === userId
    )
    if (!getrental) {
      res.json(response.error({ message: 'Rental not exists' }))
    } else {
      if (getrental.hostId !== userId) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      }
      // @ts-ignore
      const getPhoto = getRental?.Photos.find((item) => item.id === photoId)
      if (!getPhoto) {
        res.json(response.error({ message: 'Photo not exists' }))
      }
      getPhoto.description = description
      getPhoto.tag = tag
      res.json(
        response.success({
          item: { tag: tag, description: description },
          message: 'Rental photo information successfully updated',
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

export const deleteRentals = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = Number(req.params.rentalId)
    const rentalIndex = rentals.findIndex(
      (rental) => rental?.id === id && rental?.hostId === hostId
    )

    if (rentalIndex === -1) {
      res.json(
        response.error({
          message: 'Rental with given ID not found!',
        })
      )
    }
    if (rentals[rentalIndex]?.hostId !== hostId) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    rentals.splice(rentalIndex, 1)

    res.json(
      response.success({
        message: 'Rental deleted successfully!',
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

export const deleteRentalPhotosByPhotoId = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user?.id
  try {
    const id = Number(req.params.rentalId)
    const photoId = Number(req.params.photoId)
    const rental = rentals.find(
      (rentals) => rentals.id === id && rentals.hostId === userId
    )

    if (!rental) {
      res.json(
        response.error({ message: 'Rental with the given ID not found!' })
      )
    }
    if (rental?.hostId !== userId) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    const photoIndex = rental?.Photos.findIndex((photo) => photo.id === photoId) || -1

    if (photoIndex === -1) {
      res.json(
        response.error({
          message: 'Photo with the given ID not found in the rental!',
        })
      )
    }

    rental?.Photos.splice(photoIndex, 1)
    const filteredDataDeleteRentalPhotosByPhotoId = {
      id: rental?.id,
      category: rental?.category,
      make: rental?.make,
      modelBadge: rental?.modelBadge,
      bodyType: rental?.bodyType,
      fuel: rental?.fuel,
      transmission: rental?.transmission,
      year: rental?.year,
      Photos: rental?.Photos,
      Location: rental?.Location,
    }

    res.json(
      response.success({
        item: filteredDataDeleteRentalPhotosByPhotoId,
        message: 'Rental photo with the given photo id successfully deleted!',
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
