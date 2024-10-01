import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Photo, Z_Update_Photo } from '@repo/contract'
import { dbBookableUnitTypes, dbPhotos, dbProperties } from '@repo/database'
import { Request, Response } from 'express'
import { FileService } from '@/common/service/file'

const response = new ResponseService()
const fileService = new FileService()

export const addPhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  const files = req.files
  const { description, tags, isMain } = req.body
  const isValidInput = Z_Photo.safeParse(req.body)
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (!files || !propertyId) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (isValidInput.success) {
        try {
          const upload = await fileService.upload({ files })
          const values = {
            propertyId,
            key: upload.key,
            thumbKey: upload.key,
            description,
            tags,
            isMain,
          }
          const newPhoto = new dbPhotos(values)
          const uploadedPhoto = await newPhoto.save()
          const updatePhotos = await dbProperties.findByIdAndUpdate(
            propertyId,
            {
              $push: {
                photos: uploadedPhoto._id,
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
          res.json(
            response.error({
              message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
            })
          )
        }
      } else {
        res.json(
          response.error({ message: JSON.parse(isValidInput.error.message) })
        )
      }
    }
  }
}

export const addUnitPhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  const bookableUnitId = req.params.bookableUnitId
  const files = req.files
  const { description, tags, isMain } = req.body
  const isValidInput = Z_Photo.safeParse(req.body)
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (!files || !propertyId || !bookableUnitId) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (isValidInput.success) {
        try {
          const upload = await fileService.upload({ files })
          const values = {
            propertyId,
            bookableUnitId,
            key: upload.key,
            thumbKey: upload.key,
            description,
            tags,
            isMain,
          }
          const newPhoto = new dbPhotos(values)
          const uploadedPhoto = await newPhoto.save()
          const updatePhotos = await dbBookableUnitTypes.findByIdAndUpdate(
            bookableUnitId,
            {
              $push: {
                photos: uploadedPhoto._id,
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
          res.json(
            response.error({
              message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
            })
          )
        }
      } else {
        res.json(
          response.error({ message: JSON.parse(isValidInput.error.message) })
        )
      }
    }
  }
}

export const updatePhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  const photoId = req.params.photoId
  const { description, tags, isMain } = req.body
  const isValidInput = Z_Update_Photo.safeParse(req.body)
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (isValidInput.success) {
      try {
        const getPhoto = await dbPhotos.findOne({
          _id: photoId,
          propertyId,
          deletedAt: null,
        })
        if (!getPhoto) {
          res.json(response.error({ message: 'Photo not found' }))
        } else {
          const {
            description: dbDescription,
            tags: dbTags,
            isMain: dbIsMain,
          } = getPhoto
          // Needed this to not update if nothing changes
          if (
            dbDescription === description &&
            dbTags === tags &&
            dbIsMain === isMain
          ) {
            res.json(
              response.success({
                item: getPhoto,
                message: 'Photos was updated',
              })
            )
          } else {
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
          }
        }
      } catch (err: any) {
        res.json(
          response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
          })
        )
      }
    } else {
      res.json(
        response.error({ message: JSON.parse(isValidInput.error.message) })
      )
    }
  }
}

export const getPhotosByPropertyId = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    try {
      const photosData = await dbPhotos
        .find({ propertyId })
        .populate('photos')
        .exec()
      if (!photosData) {
        res.json(
          response.error({
            message: 'Photos with the given rental does not exist',
          })
        )
      } else {
        res.json(
          response.success({
            items: photosData,
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
}

export const deletePhoto = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const propertyId = req.params.propertyId
  const photoId = req.params.photoId
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (!propertyId || !photoId) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      try {
        const getPhoto = await dbPhotos.findOne({
          _id: photoId,
          deletedAt: null,
        })
        if (!getPhoto) {
          res.json(response.error({ message: 'Photo not found' }))
        } else {
          const deletePhoto = await dbPhotos.findByIdAndDelete(photoId)
          await dbProperties.findByIdAndUpdate(
            getPhoto?.propertyId,
            {
              $pull: {
                photos: photoId,
              },
              $set: {
                updatedAt: Date.now(),
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
        }
      } catch (err: any) {
        res.json(
          response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
          })
        )
      }
    }
  }
}

export const getPhotosByBookableUnitId = async (
  req: Request,
  res: Response
) => {
  const isHost = res.locals.user?.isHost
  const bookableUnitId = req.params.bookableUnitId
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    try {
      const photosData = await dbPhotos.find({ bookableUnitId })
      if (!photosData) {
        res.json(
          response.error({
            message: 'Photos with the given property unit does not exist',
          })
        )
      } else {
        res.json(
          response.success({
            items: photosData,
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
}
