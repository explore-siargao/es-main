import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_WishGroup } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

async function getListingById(listingId: number, res?: Response) {
  if (listingId) {
    return await prisma.listing.findUnique({
      where: { id: listingId },
    })
  } else {
    return res?.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
  })
}

async function getWishGroups(userId: number) {
  return await prisma.wishGroup.groupBy({
    by: ['title'],
    where: {
      userId: userId,
      deletedAt: null,
    },
  })
}

async function getWishGroupById(wishGroupId: number) {
  return await prisma.wishGroup.findUnique({
    where: { id: wishGroupId },
  })
}

async function getWishGroupByTitle(title: string, userId: number) {
  return await prisma.wishGroup.findFirst({
    where: { title: title, userId: userId },
  })
}

async function createWishGroup(
  title: string,
  userId: number,
  listingId: number
) {
  return await prisma.wishGroup.create({
    data: {
      title: title,
      userId: userId,
      listingId: listingId,
      note: null,
    },
  })
}

export const getWishGroupsByUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  try {
    const isUserExist =
      (await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      })) !== null

    if (isUserExist) {
      const getAllWishGroupByUser = await prisma.wishGroup.findMany({
        where: {
          userId: userId,
        },
      })

      if (getAllWishGroupByUser.length !== 0) {
        res.json(
          response.success({
            items: getAllWishGroupByUser,
            allItemCount: getAllWishGroupByUser.length,
            message: '',
          })
        )
      } else {
        res.json(
          response.success({
            items: getAllWishGroupByUser,
            allItemCount: getAllWishGroupByUser.length,
            message: 'No data found',
          })
        )
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const wishGroupByTitle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (getUser !== null) {
      const groupWishGroup = await prisma.wishGroup.groupBy({
        by: ['title'],
        _count: true,
        where: {
          userId: userId,
        },
      })

      // Map through the groupWishGroup array and add the new entity to each item
      const modifiedGroup = await Promise.all(
        groupWishGroup.map(async (item: any) => {
          const images = await prisma.wishGroup.findFirst({
            where: {
              title: item.title,
              userId: userId,
            },
            include: {
              listing: true,
            },
          })
          return {
            ...item,
            images: JSON.parse(images?.listing?.images as string),
          }
        })
      )

      res.json(
        response.success({
          item: modifiedGroup, // Use the modifiedGroup array with the new entity
          allItemCount: groupWishGroup.length,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const wishGroupByUserAndTitle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const title = req.params.title
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (getUser !== null) {
      const getWishGroupByuserAndTitle = await prisma.wishGroup.findMany({
        where: {
          title: title,
          userId: userId,
        },
        include: {
          listing: {
            include: {
              review: true,
              price: true,
            },
          },
        },
      })
      const modifiedResult = getWishGroupByuserAndTitle.map(
        (wishGroup: any) => {
          return {
            ...wishGroup,
            listing: {
              ...wishGroup.listing,
              images: JSON.parse(wishGroup.listing.images),
              whereYoullBe: JSON.parse(wishGroup.listing.whereYoullBe),
              whereYoullSleep: JSON.parse(wishGroup.listing.whereYoullSleep),
            },
          }
        }
      )
      res.json(
        response.success({
          items: modifiedResult,
          allItemCount: getWishGroupByuserAndTitle.length,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addWishGroup = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const isValidInput = Z_WishGroup.safeParse(req.body)
  const { title, listingId } = req.body
  if (!isValidInput.success) {
    return res.json(response.error({ message: isValidInput.error.message }))
  }

  try {
    const user = await getUserById(userId)
    if (!user) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const wishGroups = await getWishGroups(userId)

    if (wishGroups.length !== 0) {
      return res.json(
        response.success({
          items: wishGroups,
          allItemCount: wishGroups.length,
          message: '',
        })
      )
    }

    const listing = await getListingById(listingId)

    if (!listing) {
      return res.json(
        response.error({ message: 'Booking item not found in our system' })
      )
    }

    const newWishGroup = await createWishGroup(title, userId, listingId)

    return res.json(
      response.success({
        item: newWishGroup,
        allItemCount: 1,
        message: 'Successfully added to wish group',
      })
    )
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

export const addToExistingWishGroup = async (req: Request, res: Response) => {
  const listingId = req.body.listingId
  const userId = Number(req.params.userId)
  const title = req.body.title
  const isValidInput = Z_WishGroup.safeParse(req.body)

  if (!isValidInput.success) {
    return res.json(response.error({ message: isValidInput.error.message }))
  }

  try {
    const user = await getUserById(userId)

    if (!user) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const wishGroup = await getWishGroupByTitle(title, userId)

    if (!wishGroup) {
      return res.json(response.error({ message: 'Wish group not found' }))
    }

    const listing = await getListingById(listingId)

    if (!listing) {
      return res.json(response.error({ message: 'Invalid booking' }))
    }

    const newWishGroup = await createWishGroup(
      title as string,
      userId,
      listingId
    )

    return res.json(
      response.success({
        item: newWishGroup,
        allItemCount: 1,
        message: `Wish list successfully added to ${wishGroup.title}`,
      })
    )
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

export const addNewWishGroup = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const isInputValid = Z_WishGroup.safeParse(req.body)

  if (!isInputValid.success) {
    return res.json(response.error({ message: isInputValid.error.message }))
  }

  const { title, listingId } = req.body

  try {
    if (!title || !listingId) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }

    const user = await getUserById(userId)

    if (!user) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const existingWishGroup = await prisma.wishGroup.findFirst({
      where: {
        userId: userId,
        title: title,
      },
    })

    if (!existingWishGroup) {
      const newWishGroup = await prisma.wishGroup.create({
        data: {
          userId: userId,
          title: title,
          listingId: listingId,
        },
      })

      return res.json(
        response.success({
          item: newWishGroup,
          allItemCount: 1,
          message: 'New Wish group successfully added',
        })
      )
    } else {
      return res.json(
        response.error({ message: 'Item already exists in wish group' })
      )
    }
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

export const deleteWishGroup = async (req: Request, res: Response) => {
  const listingId = Number(req.params.listingId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: res.locals.user.id,
      },
    })
    if (getUser !== null) {
      const findWishGroup = await prisma.wishGroup.findFirst({
        where: {
          listingId: listingId,
          userId: res.locals.user.id,
        },
      })
      if (findWishGroup !== null) {
        const removeWishGroup = await prisma.wishGroup.deleteMany({
          where: {
            listingId: listingId,
            userId: res.locals.user.id,
          },
        })
        res.json(
          response.success({
            item: removeWishGroup,
            allItemCount: 1,
            message: 'Wishlist successfully deleted',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'Wishlist not found or its already deleted',
          })
        )
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addEditWishListNote = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const wishGroupId = Number(req.params.wishGroupId)
  const isValidInput = Z_WishGroup.safeParse(req.body)

  if (!isValidInput.success) {
    return res.json(response.error({ message: isValidInput.error.message }))
  }

  const note = req.body.note

  try {
    const user = await getUserById(userId)

    if (!user) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const wishGroup = await getWishGroupById(wishGroupId)

    if (!wishGroup) {
      return res.json(response.error({ message: 'Wish list not found' }))
    }

    if (note) {
      const addOrEditNote = await prisma.wishGroup.update({
        where: {
          userId: userId,
          id: wishGroupId,
        },
        data: {
          note: note,
        },
      })

      return res.json(
        response.success({
          item: addOrEditNote,
          allItemCount: 1,
          message: 'Note successfully added',
        })
      )
    } else {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

export const editTitle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const isValidInput = Z_WishGroup.safeParse(req.body)

  if (!isValidInput.success) {
    return res.json(response.error({ message: isValidInput.error.message }))
  }

  const oldTitle = req.body.oldTitle
  const newTitle = req.body.newTitle

  try {
    const user = await getUserById(userId)

    if (!user) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    if (oldTitle && newTitle) {
      const updateTitle = await prisma.wishGroup.updateMany({
        where: {
          userId: userId,
          title: oldTitle,
        },
        data: {
          title: newTitle,
        },
      })

      if (updateTitle.count !== 0) {
        return res.json(
          response.success({
            item: updateTitle,
            allItemCount: updateTitle.count,
            message: 'Title successfully updated',
          })
        )
      } else {
        return res.json(
          response.error({ message: 'No title has been updated' })
        )
      }
    } else {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

export const deleteWishGroupByTitle = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const title = req.params.title
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (getUser !== null) {
      if (title) {
        const deleteWishGroups = await prisma.wishGroup.deleteMany({
          where: {
            userId: userId,
            title: title,
          },
        })
        if (deleteWishGroups.count !== 0) {
          res.json(
            response.success({
              item: deleteWishGroups,
              allItemCount: deleteWishGroups.count,
              message: 'Wish group successfully deleted',
            })
          )
        } else {
          res.json(
            response.error({ message: 'No wish group has been deleted' })
          )
        }
      } else {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}
