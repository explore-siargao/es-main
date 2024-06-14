import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const addProperty = async (req: Request, res: Response) => {
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
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getPropertiesByHostId = async (req: Request, res: Response) => {
  try {
    const hostId = req.params.activityId
    const properties = await dbProperties.find({ host: hostId })

    const filteredProperties = properties.reverse()
    console.log('properties', filteredProperties)
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

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId

    const property = await dbProperties
      .findOne({ _id: propertyId })
      .populate('offerBy')
      .populate('photos')
      .populate('location')
      .populate('facilities')
      .populate('policies')
      .populate('bookableUnits')
      .populate('reservations')

    res.json(response.success({ item: property }))
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
      return res.json(
        response.error({
          message: 'Property not found or already deleted!',
        })
      )
    }

    if (property.offerBy?.toString() !== userId) {
      return res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    }

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
    const propertyType = await dbProperties
      .findOne({ _id: propertyId, host: hostId }, 'type')

    res.json(response.success({ item: { propertyType: propertyType } }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
