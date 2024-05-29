import { Request, Response } from 'express'
import { carts } from './jsons/carts'
import { ResponseService } from '@/common/service/response'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()
export const getCartsByUser = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  if (!userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const filterCarts = carts.filter((item) => {
    return userId === item.userId
  })
  res.json(
    response.success({ items: filterCarts, allItemCount: filterCarts.length })
  )
}

export const getCartsByHost = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  const filterCarts = carts.filter((item) => {
    return hostId === item.Listing.hostId
  })
  res.json(
    response.success({ items: filterCarts, allItemCount: filterCarts.length })
  )
}

export const getCartsByListing = async (req: Request, res: Response) => {
  const listingId = Number(req.params.listingId)
  const filterCarts = carts.filter((item) => {
    return listingId === item.listingId
  })
  res.json(
    response.success({ items: filterCarts, allItemCount: filterCarts.length })
  )
}

export const addCart = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const { listingId, guestCounts, totalFee, dateFrom, dateTo } = req.body
  const listing = {
    id: listingId,
    hostId: 1,
    title: 'Amazing World',
    address: 'Siargao City',
    imageKey: '5.jpg',
    serviceFee: 300,
    cleaningFee: 200,
    fee: 8000,
  }
  const user = {
    id: userId,
    firstName: 'James',
    lastName: 'Gomez',
  }
  if (!userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!listingId || !guestCounts || !totalFee || !dateFrom || !dateTo) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  const cartsData = {
    id: 10,
    userId: userId,
    User: user,
    listingId: listingId,
    listing: listing,
    guestCounts: JSON.stringify(guestCounts),
    totalFee: totalFee,
    dateFrom: dateFrom,
    dateTo: dateTo,
  }

  //@ts-ignore
  carts.push(cartsData)
  res.json(
    response.success({
      item: cartsData,
      message: 'New item successfully added to cart.',
    })
  )
}

export const updateCart = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const cartId = Number(req.params.cartId)
  const { guestCounts, totalFee, dateFrom, dateTo } = req.body
  const findCart = carts.findIndex((item) => item.id === cartId)
  if (!userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (findCart === -1) {
    return res.json(
      response.error({ message: 'No cart found or already deleted' })
    )
  }
  const updatedcart = {
    ...carts[findCart],
    guestCounts: JSON.stringify(guestCounts),
    totalFee: totalFee,
    dateFrom: dateFrom,
    dateTo: dateTo,
  }
  //@ts-ignore
  carts[findCart] = updatedcart
  res.json(
    response.success({
      item: carts[findCart],
      message: 'Cart details successfully updated',
    })
  )
}

export const deleteCart = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const cartIds = req.body.cartIds.map(Number) // Assuming cartIds are sent in the request body as an array

  if (!userId) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (!cartIds || cartIds.length === 0) {
    return res.json(response.error({ message: 'No cart IDs provided' }))
  }
  //@ts-ignore
  const deletedCarts = []
  cartIds.forEach((cartId: number) => {
    const findCartIndex = carts.findIndex((item) => item.id === cartId)
    if (findCartIndex !== -1) {
      deletedCarts.push(carts.splice(findCartIndex, 1)[0])
    }
  })

  if (deletedCarts.length === 0) {
    return res.json(
      response.error({ message: 'No carts found with provided IDs' })
    )
  }
  //@ts-ignore
  return res.json({
    message: 'Carts deleted successfully',
    //@ts-ignore
    items: deletedCarts,
  })
}
