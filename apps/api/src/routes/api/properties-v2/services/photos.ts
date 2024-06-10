import { REQUIRED_VALUE_EMPTY, UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Photo, Z_Update_Photo } from '@repo/contract'
import { dbPhotos } from '@repo/database'
import { Request, Response } from 'express'
import { FileService } from '@/common/service/file'

const response = new ResponseService()
const fileService = new FileService()

export const addPhoto = async (req: Request, res: Response) => {
  const isHost = true
  const propertyId = req.params.propertyId
  const files = req.files
  const {
    bookableUnitTypeId,
    description,
    tags,
    isMain
  } = req.body
  const isValidInput = Z_Photo.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!files || !propertyId) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  if (isValidInput.success) {
    try {
      // ADD UPLOAD HERE
      const upload = await fileService.upload({ files })
      const values = {
        ...(bookableUnitTypeId ? { bookableUnitTypeId } : {}),
        propertyId,
        key: upload.key,
        thumbKey: upload.key,
        description,
        tags,
        isMain,
      }
      const newPhoto = new dbPhotos(values)
      const uploadedPhoto = await newPhoto.save()
      // const updatePhotos = await dbProperties.findByIdAndUpdate(
      //   propertyId,
      //   {
      //     $set: {
      //       photos: [...photosIds, uploadedPhoto._id] // new photo here
      //       updatedAt: Date.now(),
      //     },
      //   },
      //   { new: false }
      // )
      res.json(
        response.success({
          item: uploadedPhoto,
          message: 'Photo was added',
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
  const photoId = req.params.photoId
  const {
    description,
    tags,
    isMain
  } = req.body
  const isValidInput = Z_Update_Photo.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isValidInput.success) {
    try {
      const getPhoto = await dbPhotos.findOne({
        _id: photoId,
        deletedAt: null,
      })
      if (!getPhoto) {
        return res.json(response.error({ message: 'Photo not found' }))
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
        { new: false }
      )
      res.json(
        response.success({
          item: updatePhoto,
          message: 'Photo was updated',
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

export const getPhotosByPropertyId = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  try {
    const photosData = await dbPhotos.find({ propertyId })
    if (!photosData) {
      return res.json(
        response.error({
          message: 'Photos with the given property does not exist',
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

export const getPhotosByBookableUnitId = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const bookableUnitId = req.params.bookableUnitId
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  try {
    const photosData = await dbPhotos.find({ bookableUnitId })
    if (!photosData) {
      return res.json(
        response.error({
          message: 'Photos with the given property unit does not exist',
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
  const photoId = req.params.photoId
  const isValidInput = Z_Photo.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isValidInput.success) {
    try {
      const getPhoto = await dbPhotos.findOne({
        _id: photoId,
        deletedAt: null,
      })
      if (!getPhoto) {
        return res.json(response.error({ message: 'Photo not found' }))
      }
      const deletePhoto = await dbPhotos.findByIdAndDelete(
        photoId,
      )
      // const updatePhotos = await dbProperties.findByIdAndUpdate(
      //   propertyId,
      //   {
      //     $set: {
      //       photos: // remove photo _id from this value
      //       updatedAt: Date.now(),
      //     },
      //   },
      //   { new: false }
      // )
      res.json(
        response.success({
          item: deletePhoto,
          message: 'Photo was deleted',
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