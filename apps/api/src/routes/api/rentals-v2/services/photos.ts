import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { dbPhotos, dbRentals } from '@repo/database'
import { E_Rental_Category, T_Photo } from '@repo/contract'

const response = new ResponseService()

export const getRentalPhotos = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = req.params.rentalId
    const rental = await dbRentals
      .findOne({ host: hostId, _id: id })
      .populate('photos')

    if (!rental) {
      return res.json(
        response.error({
          message: 'Rental Photos with the given ID not found!',
        })
      )
    }

    const rentalData = {
      id: rental._id,
      photos: rental.photos,
    }

    return res.json(
      response.success({
        item: rentalData,
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

export const updateRentalPhotos = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = req.params.rentalId
    const newRentalPhotos = req.body.photos
    const rental = await dbRentals
      .findOne({ host: hostId, _id: id })
      .populate('photos')

    if (!rental) {
      return res.json(
        response.error({ message: 'Rental with the given ID not found!' })
      )
    }

    let minPhotosRequired = 0
    let keyPrefix = ''
    switch (rental.category) {
      case E_Rental_Category.Motorbike:
        minPhotosRequired = 3
        keyPrefix = 'honda-click-'
        break
      case E_Rental_Category.Bicycle:
        minPhotosRequired = 3
        keyPrefix = 'cervelo-'
        break
      case E_Rental_Category.Car:
        minPhotosRequired = 5
        keyPrefix = 'sorrento'
        break
      default:
        break
    }

    if (newRentalPhotos.length < minPhotosRequired) {
      return res.json(
        response.error({
          message: `Minimum of ${minPhotosRequired} Photos allowed!`,
        })
      )
    }

    const savedPhotos = await Promise.all(
      newRentalPhotos.map(async (photo: T_Photo, index: number) => {
        const savedPhoto = await dbPhotos.create({
          ...photo,
          key: `${keyPrefix}${index + 1}.jpg`,
        })
        return savedPhoto._id
      })
    )

    rental.photos = savedPhotos
    rental.finishedSections = ["basicInfo", "details", "addOns", "photos"]

    await rental.save()

    const filteredDataUpdateRentalPhotos = {
      id: rental._id,
      category: rental.category,
      make: rental.make,
      modelBadge: rental.modelBadge,
      bodyType: rental.bodyType,
      fuel: rental.fuel,
      transmission: rental.transmission,
      year: rental.year,
      Photos: rental.photos,
      Location: rental.location,
    }

    return res.json(
      response.success({
        item: filteredDataUpdateRentalPhotos,
        message: 'Rental photos successfully updated!',
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

export const editPhotoInfo = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = req.params.rentalId
  const photoId = req.params.photoId
  const { tag, description } = req.body

  if (!tag && !description) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

  try {
    const rental = await dbRentals
      .findOne({ host: hostId, _id: id })
      .populate('photos')

    if (!rental) {
      return res.json(response.error({ message: 'Rental not exists' }))
    }

    const photo = await dbPhotos.findById(photoId)
    if (!photo) {
      return res.json(response.error({ message: 'Photo not exists' }))
    }

    const photoExistsInRental = rental.photos?.some((photo) =>
      photo._id.equals(photoId)
    )
    if (!photoExistsInRental) {
      return res.json(response.error({ message: 'Photo does not exist' }))
    }

    photo.description = description
    photo.tag = tag
    photo.updatedAt = new Date()
    await photo.save()

    res.json(
      response.success({
        item: { tag: tag, description: description },
        message: 'Rental photo information successfully updated',
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

export const deleteRentalPhotosByPhotoId = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user?.id
  try {
    const id = req.params.rentalId
    const photoId = req.params.photoId
    const rental = await dbRentals
      .findOne({
        host: userId,
        _id: id,
      })
      .populate('photos')
    if (!rental) {
      return res.json(
        response.error({ message: 'Rental with the given ID not found!' })
      )
    }
    if (rental.host?.toString() !== userId) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    let photoIndex = -1
    if (rental.photos) {
      photoIndex = rental?.photos.findIndex(
        (photo) => photo._id.toString() === (photoId as string)
      )
    }

    if (photoIndex === -1) {
      return res.json(
        response.error({
          message: 'Photo with the given ID not found in the rental!',
        })
      )
    }
    if (rental.photos) {
      rental.photos.splice(photoIndex, 1)
      await rental.save()
    }
    const filteredDataDeleteRentalPhotosByPhotoId = {
      _id: rental._id,
      category: rental.category,
      make: rental.make,
      modelBadge: rental.modelBadge,
      bodyType: rental.bodyType,
      fuel: rental.fuel,
      transmission: rental.transmission,
      year: rental.year,
      photos: rental.photos,
      Location: rental.location,
    }

    return res.json(
      response.success({
        item: filteredDataDeleteRentalPhotosByPhotoId,
        message: 'Rental photo with the given photo id successfully deleted!',
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
