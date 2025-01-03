import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { convertPrice } from '@/common/helpers/convert-price'
import { ResponseService } from '@/common/service/response'
import {
  T_Property_Basic_Info,
  Z_Property_Basic_Info,
  T_Location,
  E_Property_Status,
} from '@repo/contract'
import {
  dbProperties,
  dbLocations,
  dbBookableUnitTypes,
  dbUnitPrices,
  dbPhotos,
} from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const addProperty = async (req: Request, res: Response) => {
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
      const newProperty = new dbProperties({
        offerBy: hostId,
        status: 'Incomplete',
        finishedSections: [],
        title: '',
        description: '',
        currency: null,
        primaryLanguage: null,
        phone: null,
        email: null,
        location: null,
        checkInTime: null,
        checkOutTime: null,
        isLateCheckOutAllowed: false,
        lateCheckOutType: null,
        lateCheckOutValue: null,
        termsAndConditions: null,
        taxId: null,
        taxId2: null,
        companyLegalName: null,
        type: null,
        facilities: [],
        policies: [],
        bookableUnits: [],
        reservations: [],
      })
      await newProperty.save()
      res.json(
        response.success({
          item: newProperty,
          message: 'New property added successfully',
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

export const getPropertiesByHostId = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id
    const properties = await dbProperties
      .find({ offerBy: hostId, deletedAt: null })
      .populate('photos')
      .populate('location')

    const filteredProperties = properties.reverse()
    res.json(
      response.success({
        items: filteredProperties,
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

export const getPropertyByIdPublic = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  try {
    const propertyId = req.params.propertyId
    const property = await dbProperties
      .findOne({
        _id: propertyId,
        // status: { $in: [E_Property_Status.live, E_Property_Status.pending] },
      })
      .populate({
        path: 'offerBy',
        populate: [{ path: 'guest' }],
      })
      .populate('photos')
      .populate('location')
      .populate('facilities')
      .populate('policies')
      .populate({
        path: 'bookableUnits',
        populate: {
          path: 'photos amenities unitPrice',
        },
      })
      .populate('reservations')
    if (!property) {
      res.json(
        response.error({
          status: 404,
          message: 'Property with given ID not found!',
        })
      )
    } else {
      const newProperty = property.toObject()
      const modifiedProperty = newProperty.bookableUnits.map((item: any) => ({
        ...item,
        unitPrice: {
          ...item.unitPrice,
          baseRate: convertPrice(
            item.unitPrice.baseRate,
            preferredCurrency,
            conversionRates
          ),
          pricePerAdditionalPerson: convertPrice(
            item.unitPrice.pricePerAdditionalPerson,
            preferredCurrency,
            conversionRates
          ),
          discountedWeeklyRate: convertPrice(
            item.unitPrice.discountedWeeklyRate,
            preferredCurrency,
            conversionRates
          ),
          discountedMonthlyRate: convertPrice(
            item.unitPrice.discountedMonthlyRate,
            preferredCurrency,
            conversionRates
          ),
        },
      }))
      newProperty.bookableUnits = modifiedProperty
      res.json(
        response.success({
          item: newProperty,
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

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId
    const property = await dbProperties
      .findOne({ _id: propertyId })
      .populate({
        path: 'offerBy',
        populate: [{ path: 'guest' }],
      })
      .populate('photos')
      .populate('location')
      .populate('facilities')
      .populate('policies')
      .populate({
        path: 'bookableUnits',
        populate: {
          path: 'photos amenities unitPrice',
        },
      })
      .populate('reservations')

    if (!property) {
      res.json(
        response.error({
          status: 404,
          message: 'Property with given ID not found!',
        })
      )
    } else {
      res.json(response.success({ item: property }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const deleteProperty = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  try {
    const property = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })

    if (!property) {
      res.json(
        response.error({
          message: 'Property not found or already deleted!',
        })
      )
    } else {
      if (property?.offerBy?.toString() !== userId) {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      } else {
        const updateProperty = await dbProperties.findOneAndUpdate(
          { _id: propertyId, offerBy: userId, deletedAt: null },
          { deletedAt: Date.now() },
          { new: true }
        )

        res.json(
          response.success({
            item: updateProperty,
            message: 'Property successfully deleted!',
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

export const getPropertyType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId

  try {
    const propertyType = await dbProperties.findOne(
      { _id: propertyId, offerBy: hostId, deletedAt: null },
      'type'
    )

    res.json(response.success({ item: { propertyType: propertyType } }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePropertyType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const { type } = req.body

  try {
    const updatePropertyType = await dbProperties
      .findOneAndUpdate(
        { _id: propertyId, offerBy: hostId },
        {
          $set: {
            type: type,
          },
          $addToSet: {
            finishedSections: 'type',
          },
        },
        { new: true, runValidators: true, fields: { type: 1 } }
      )
      .exec()

    if (!updatePropertyType) {
      res.json(
        response.error({
          message: 'Property not found for the given host id and property id',
        })
      )
    } else {
      const property = await dbProperties.findOne({ _id: propertyId })
      const units = property?.bookableUnits
      if (property?.status !== E_Property_Status.live) {
        units?.forEach(async (id) => {
          const bookableUnit = await await dbBookableUnitTypes.findOne({
            _id: id,
          })
          const priceId = bookableUnit?.unitPrice
          await dbUnitPrices.findByIdAndDelete(priceId)
          await dbPhotos.deleteMany({ bookableUnitId: id })
          await dbBookableUnitTypes.findByIdAndDelete(id)
          await dbProperties.findByIdAndUpdate(propertyId, {
            $set: {
              bookableUnits: [],
            },
          })
        })
        res.json(
          response.success({
            item: { type: updatePropertyType?.type },
            message: 'Property type updated successfully',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'Property already lived you can change the property type',
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

export const updateWholePlaceType = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const { type } = req.body

  try {
    const updateWholePlaceType = await dbProperties
      .findOneAndUpdate(
        { _id: propertyId, offerBy: hostId },
        {
          $set: {
            wholeplaceType: type,
          },
          $addToSet: {
            finishedSections: 'wholePlaceType',
          },
        },
        { new: true, runValidators: true, fields: { wholeplaceType: 1 } }
      )
      .exec()

    if (!updateWholePlaceType) {
      res.json(
        response.error({
          message: 'Property not found for the given host id and property id',
        })
      )
    } else {
      res.json(
        response.success({
          item: { updateWholePlaceType },
          message: 'Whole place type updated successfully',
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

export const getPropertyInfo = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = req.params.propertyId

  try {
    const findPropertyInfo = await dbProperties.findById({
      offerBy: hostId,
      _id: id,
    })

    const getPropertyInfo = {
      type: findPropertyInfo?.type,
      title: findPropertyInfo?.title,
      description: findPropertyInfo?.description,
      phone: findPropertyInfo?.phone,
      email: findPropertyInfo?.email,
    }

    res.json(response.success({ item: getPropertyInfo }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getPropertyLocation = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id

  try {
    const findPropertyInfo = await dbProperties
      .find({ offerBy: hostId })
      .populate('location')

    const location = findPropertyInfo.map((property) => property.location)

    res.json(response.success({ item: location }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePropertyBasicInfo = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const { title, description }: T_Property_Basic_Info = req.body
  const isValidInput = Z_Property_Basic_Info.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const updatedProperty = await dbProperties.findByIdAndUpdate(
        { _id: propertyId },
        {
          $set: {
            title,
            description,
            updatedAt: Date.now(),
          },
          $addToSet: {
            finishedSections: 'basicInfo',
          },
        },
        { new: true }
      )
      if (!updatedProperty) {
        res.json(
          response.error({
            message: 'Property not found!',
          })
        )
      } else {
        res.json(
          response.success({
            item: updatedProperty,
            message: 'Property basic info successfully updated',
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
  } else {
    res.json(
      response.error({
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

export const updatePropertyLocation = async (req: Request, res: Response) => {
  const propertyId = req.params.propertyId
  const {
    streetAddress,
    barangay,
    city,
    longitude,
    latitude,
    howToGetThere,
  }: Partial<T_Location> = req.body

  if (
    !streetAddress &&
    !barangay &&
    !city &&
    !longitude &&
    !latitude &&
    !howToGetThere
  ) {
    res.json(response.error({ message: 'Required value is empty' }))
  } else {
    try {
      const property = await dbProperties
        .findById(propertyId)
        .populate('location')

      if (!property) {
        res.json(response.error({ message: 'Property not found' }))
      } else {
        if (property?.location === null) {
          const newLocation = new dbLocations({
            streetAddress: streetAddress,
            barangay: barangay,
            city: city,
            longitude: longitude,
            latitude: latitude,
            howToGetThere: howToGetThere,
          })
          await newLocation.save()
          await dbProperties.findByIdAndUpdate(
            propertyId,
            {
              $set: {
                location: newLocation._id,
              },
              $addToSet: {
                finishedSections: 'location',
              },
            },
            { new: true }
          )
        } else {
          await dbLocations.findByIdAndUpdate(property?.location, {
            $set: {
              streetAddress: streetAddress,
              barangay: barangay,
              city: city,
              longitude: longitude,
              latitude: latitude,
              howToGetThere: howToGetThere,
            },
          })
          await dbProperties.findByIdAndUpdate(
            propertyId,
            {
              $addToSet: {
                finishedSections: 'location',
              },
            },
            { new: true }
          )
        }

        // property.finishedSections = ['type', 'basicInfo', 'location']

        res.json(
          response.success({
            item: property,
            message: 'Property location updated',
          })
        )
      }
    } catch (err: any) {
      console.error(err)
      res.json(
        response.error({
          message: err.message ? err.message : 'Unknown error occurred',
        })
      )
    }
  }
}
