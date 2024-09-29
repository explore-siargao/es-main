import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { rentals } from './jsons/rentals'
import { E_Rental_Category, T_Photo } from '@repo/contract'

const response = new ResponseService()

export const getRentalPhotos = (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  try {
    const id = Number(req.params.rentalId)

    const rental = rentals.find(
      (rental) => rental?.id === id && hostId === rental?.hostId
    )

    if (!rental) {
      res.json(
        response.error({
          message: 'Rental Photos with the given ID not found!',
        })
      )
    }

    const rentalData = {
      id: rental?.id,
      Photos: rental?.Photos,
    }

    res.json(
      response.success({
        item: rentalData,
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

export const updateRentalPhotos = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  try {
    const id = Number(req.params.rentalId)
    const newRentalPhotos = req.body.photos

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
    if (rental?.category === E_Rental_Category.Motorbike) {
      if (newRentalPhotos.length < 3) {
        res.json(response.error({ message: 'Minimum of 3 Photos allowed!' }))
      }
      const updatedRentalPhotos = newRentalPhotos.map(
        (photos: T_Photo, photoIndex: number) => {
          return {
            ...photos,
            key: `honda-click-${photoIndex + 1}.jpg`,
          }
        }
      )
      rental.Photos = updatedRentalPhotos
    } else if (rental?.category === E_Rental_Category.Bicycle) {
      if (newRentalPhotos.length < 3) {
        res.json(response.error({ message: 'Minimum of 3 Photos allowed!' }))
      }
      const updatedRentalPhotos = newRentalPhotos.map(
        (photos: T_Photo, photoIndex: number) => {
          return {
            ...photos,
            key: `cervelo-${photoIndex + 1}.jpg`,
          }
        }
      )
      rental.Photos = updatedRentalPhotos
    } else if (rental?.category === E_Rental_Category.Car) {
      if (newRentalPhotos.length < 5) {
        res.json(response.error({ message: 'Minimum of 5 Photos allowed!' }))
      }
      const updatedRentalPhotos = newRentalPhotos.map(
        (photos: T_Photo, photoIndex: number) => {
          return {
            ...photos,
            key: `sorrento${photoIndex + 1}.jpg`,
          }
        }
      )
      rental.Photos = updatedRentalPhotos
    }

    const filteredDataUpdateRentalPhotos = {
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
    if (rental) {
      rental.finishedSections = '["basicInfo", "details", "addOns", "photos"]'
    }
    res.json(
      response.success({
        item: filteredDataUpdateRentalPhotos,
        message: 'Rental photos successfully updated!',
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
