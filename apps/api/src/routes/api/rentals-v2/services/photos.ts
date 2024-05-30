import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import {
  dbPhotos,
    dbRentals,
  } from '@repo/database'
import { E_Rental_Category, T_Photo } from '@repo/contract'

const response = new ResponseService()

export const getRentalPhotos = async (req: Request, res: Response) => {
    const hostId = res.locals.user?.id
    try {
      const id = req.params.rentalId
      const rental = await dbRentals.findOne(
        { host: hostId, _id: id }
      ).populate('photos')
    
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
        const rental = await dbRentals.findOne({ host: hostId, _id: id }).populate('photos')

        if (!rental) {
            return res.json(response.error({ message: 'Rental with the given ID not found!' }))
        }

        let minPhotosRequired = 0;
        let keyPrefix = "";
        switch (rental.category) {
            case E_Rental_Category.Motorbike:
                minPhotosRequired = 3;
                keyPrefix = "honda-click-";
                break;
            case E_Rental_Category.Bicycle:
                minPhotosRequired = 3;
                keyPrefix = "cervelo-";
                break;
            case E_Rental_Category.Car:
                minPhotosRequired = 5;
                keyPrefix = "sorrento";
                break;
            default:
                break;
        }

        if (newRentalPhotos.length < minPhotosRequired) {
            return res.json(response.error({ message: `Minimum of ${minPhotosRequired} Photos allowed!` }));
        }

        const savedPhotos = await Promise.all(newRentalPhotos.map(async (photo: T_Photo, index: number) => {
            const savedPhoto = await dbPhotos.create({
                ...photo,
                key: `${keyPrefix}${index + 1}.jpg`
            });
            return savedPhoto._id;
        }));

        rental.photos = savedPhotos
        rental.finishedSections = '["basicInfo", "details", "addOns", "photos"]'

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

        return res.json(response.success({
            item: filteredDataUpdateRentalPhotos,
            message: 'Rental photos successfully updated!',
        }))
    } catch (err: any) {
        return res.json(response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        }))
    }
}


  