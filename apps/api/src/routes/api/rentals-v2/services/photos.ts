import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Photo, Z_Update_Photo } from '@repo/contract'
import { dbPhotos, dbRentals } from '@repo/database'
import { Request, Response } from 'express'
import { FileService } from '@/common/service/file'

const response = new ResponseService()
const fileService = new FileService()

export const addPhoto = async (req: Request, res: Response) => {
  const isHost = true
  const rentalId = req.params.rentalId
  const files = req.files
  const { description, tags, isMain } = req.body
  const isValidInput = Z_Photo.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!files || !rentalId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  if (isValidInput.success) {
    try {
      const upload = await fileService.upload({ files })
      const values = {
        rentalId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      }
      const newPhoto = new dbPhotos(values)
      const uploadedPhoto = await newPhoto.save()
      const updatePhotos = await dbRentals.findByIdAndUpdate(
        rentalId,
        {
          $push: {
            photos: uploadedPhoto._id
          },
          $set: {
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      res.json(
        response.success({
          item: updatePhotos,
          message: 'Photos was updated',
        })
      )
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    return res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

export const updatePhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const rentalId = req.params.rentalId
  const photoId = req.params.photoId
  const { description, tags, isMain } = req.body
  const isValidInput = Z_Update_Photo.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isValidInput.success) {
    try {
      const getPhoto = await dbPhotos.findOne({
        _id: photoId,
        rentalId,
        deletedAt: null,
      })
      if (!getPhoto) {
        return res.json(response.error({ message: 'Photo not found' }))
      }
      const { 
        description: dbDescription,
        tags: dbTags,
        isMain: dbIsMain,
      } = getPhoto;
      // Needed this to not update if nothing changes
      if (dbDescription === description && dbTags === tags && dbIsMain === isMain) {
        return res.json(
          response.success({
            item: getPhoto,
            message: 'Photos was updated',
          })
        )
      }
      const updatePhoto = await dbPhotos.findByIdAndUpdate(
        photoId,
        {
          $set: {
            description,
            tags,
            isMain,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      res.json(
        response.success({
          item: updatePhoto,
          message: 'Photos was updated',
        })
      )
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    return res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

export const getPhotosByRentalId = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const rentalId = req.params.rentalId
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  try {
    const photosData = await dbPhotos.find({ rentalId }).populate('photos').exec()
    if (!photosData) {
      return res.json(
        response.error({
          message: 'Photos with the given rental does not exist',
        })
      )
    }
    return res.json(
      response.success({
        items: photosData,
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

export const deletePhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const rentalId = req.params.rentalId
  const photoId = req.params.photoId
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!rentalId || !photoId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  try {
    const getPhoto = await dbPhotos.findOne({
      _id: photoId,
      deletedAt: null,
    })
    if (!getPhoto) {
      return res.json(response.error({ message: 'Photo not found' }))
    }
    const deletePhoto = await dbPhotos.findByIdAndDelete(photoId)
    await dbRentals.findByIdAndUpdate(
      getPhoto.rentalId,
      {
        $pull: {
          photos: photoId
        },
        $set: {
          updatedAt: Date.now()
        },
      },
      { new: true }
    )
    res.json(
      response.success({
        item: deletePhoto,
        message: 'Photos was updated',
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
