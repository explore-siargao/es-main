import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { bookableUnits } from './jsons/bookableUnits'
import { T_UpdateBookableUnitTypes } from '@repo/contract'

const response = new ResponseService()

export const getAllBookableUnitTypeByHost = async (
  req: Request,
  res: Response
) => {
  const isHost = res.locals.user?.isHost

  const hostId = res.locals.user?.id
  const bookableUnitTypeData = bookableUnits.find((item) =>
    item.BookableUnit.find((item) => item.id === hostId)
  )
  if (!isHost || !bookableUnitTypeData?.hostId === hostId) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  if (!bookableUnitTypeData) {
    res.json(response.error({ message: 'Not found for the given host ID!' }))
  }
  try {
    const filteredData = bookableUnitTypeData?.BookableUnit.map((item) => ({
      bookableUnitId: item.BookableUnitType.id,
      propertyId: item.propertyId,
      name: item.BookableUnitType.name,
      description: item.BookableUnitType.description,
      qty: item.BookableUnitType.qty,
      Photo: item.BookableUnitType.Photo[0],
    }))

    res.json(
      response.success({
        items: filteredData,
        allItemCount: bookableUnitTypeData?.BookableUnit.length,
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

export const getBookableUnitTypeByBookableUnitId = async (
  req: Request,
  res: Response
) => {
  const bookableUnitId = Number(req.params.bookableUnitId)
  const found = bookableUnits.find((item) =>
    item.BookableUnit.some((unit) => unit.id === bookableUnitId)
  )

  if (!found) {
    res.json(
      response.error({ message: 'Not found for the given bookable unit ID!' })
    )
  }

  const bookableUnitTypeData = found?.BookableUnit.find(
    (item) => item.id === bookableUnitId
  )

  try {
    const filteredData = {
      //@ts-ignore
      bookableUnitId: bookableUnitTypeData.id,
      //@ts-ignore
      propertyId: bookableUnitTypeData.propertyId,
      //@ts-ignore
      name: bookableUnitTypeData.BookableUnitType.name,
      //@ts-ignore
      description: bookableUnitTypeData.BookableUnitType.description,
      //@ts-ignore
      qty: bookableUnitTypeData.BookableUnitType.qty,
      //@ts-ignore
      Amenities: bookableUnitTypeData.BookableUnitType.Amenities,
      //@ts-ignore
      Photos: bookableUnitTypeData.BookableUnitType.Photo,
    }

    res.json(
      response.success({
        item: filteredData,
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

export const getPaginatedBookableUnitByPropertyId = async (
  req: Request,
  res: Response
) => {
  const propertyId = Number(req.params.propertyId)
  const page = Number(req.query.page || 1)
  const rowsPerPage = 5

  const bookableUnitsData = bookableUnits.find((item) => item.id === propertyId)
  if (!bookableUnitsData || bookableUnitsData.BookableUnit.length === 0) {
    res.json(
      response.error({
        message: 'Bookable units with the given property ID not found',
      })
    )
  }

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedBookableUnits =
    bookableUnitsData?.BookableUnit.slice(startIndex, endIndex) || []
  try {
    const filteredData = paginatedBookableUnits.map((item) => ({
      bookableUnitId: item.id,
      propertyId: item.propertyId,
      //@ts-ignore
      Photos: item.BookableUnitType.Photo[0],
      name: item.BookableUnitType.name,
      description: item.BookableUnitType.description,
      category: item.BookableUnitType.category,
      quantity: item.BookableUnitType.qty,
    }))

    res.json(
      response.success({
        items: filteredData,
        allItemCount: paginatedBookableUnits.length,
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

export const updateBookableUnitByBookableUnitId = async (
  req: Request,
  res: Response
) => {
  const bookableUnitId = Number(req.params.bookableUnitId)
  const {
    name,
    description,
    qty,
    Amenities,
    Photos,
  }: T_UpdateBookableUnitTypes = req.body

  let bookableUnitToUpdate
  for (const bookableUnit of bookableUnits) {
    const found = bookableUnit?.BookableUnit.find(
      (item) => item.id === bookableUnitId
    )
    if (found) {
      bookableUnitToUpdate = found
      break
    }
  }

  if (!bookableUnitToUpdate) {
    res.json(
      response.error({
        message: 'Bookable unit with the given ID not found!',
      })
    )
  } else {
    try {
      bookableUnitToUpdate.BookableUnitType.name =
        name || bookableUnitToUpdate.BookableUnitType.name
      bookableUnitToUpdate.BookableUnitType.description =
        description || bookableUnitToUpdate.BookableUnitType.description
      bookableUnitToUpdate.BookableUnitType.qty =
        qty || bookableUnitToUpdate.BookableUnitType.qty
      //@ts-ignore
      bookableUnitToUpdate.BookableUnitType.Amenities =
        //@ts-ignore
        Amenities || bookableUnitToUpdate.BookableUnitType.Amenities
      //@ts-ignore
      bookableUnitToUpdate.BookableUnitType.Photo =
        //@ts-ignore
        Photos || bookableUnitToUpdate.BookableUnitType.Photo

      res.json(
        response.success({
          item: bookableUnitToUpdate.BookableUnitType,
          message: 'Bookable unit updated successfully!',
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

export const addBookableUnit = async (req: Request, res: Response) => {
  const propertyId = Number(req.params.propertyId)
  const newBookableUnitType = req.body
  const bookableUnit = bookableUnits.find((unit) => unit.id === propertyId)
  if (!bookableUnit) {
    res.json(
      response.error({
        message: 'Property ID not found!',
      })
    )
  }

  newBookableUnitType.id = (bookableUnit?.BookableUnit.length || 0) + 1
  try {
    bookableUnit?.BookableUnit.push({
      id: newBookableUnitType.id,
      propertyId: propertyId,
      BookableUnitType: newBookableUnitType,
    })

    res.json(
      response.success({
        item: newBookableUnitType,
        message: 'New bookable unit type added successfully!',
        allItemCount: bookableUnit?.BookableUnit.length,
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
