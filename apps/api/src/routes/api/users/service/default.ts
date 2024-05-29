import { Response, Request } from 'express'
import CryptoJS from 'crypto-js'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { prisma } from '@/common/helpers/prismaClient'
import { PASSWORD_ENCRYPT_KEY } from '@/common/constants/ev'

const response = new ResponseService()
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        guest: {
          include: {
            emergencyContacts: true,
            Address: true,
          },
        },
      },
    })
    const modifyUsers = users.map((user: any) => ({
      ...user,
      personalInfo: {
        ...user.guest,
        confirm: user.guest?.confirm ? JSON.parse(user.guest?.confirm) : null,
        governmentId: user.guest?.governmentId
          ? JSON.parse(user.guest.governmentId)
          : null,
      },
    }))
    const addresses = await prisma.addresses.findMany({})
    if (users.length > 0) {
      res.json(
        response.success({
          items: [modifyUsers, addresses],
          allItemCount: users.length,
        })
      )
    } else {
      res.json(response.error({ message: 'No data found' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const deactivateAccount = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    const deactivateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deactivated: true,
      },
    })
    res.json(
      response.success({
        item: deactivateUser,
        allItemCount: 1,
        message: 'User Account successfully deactivated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const updatePassword = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { currentPassword, newPassword, confirmNewPassword } = req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!(currentPassword && newPassword && confirmNewPassword)) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
    if (newPassword !== confirmNewPassword) {
      return res.json(response.error({ message: 'Password not matched' }))
    }
    const decryptPassword = CryptoJS.AES.decrypt(
      getUser.password as string,
      PASSWORD_ENCRYPT_KEY
    )
    const encryptCurrentPassword = CryptoJS.AES.encrypt(
      currentPassword,
      PASSWORD_ENCRYPT_KEY
    )
    const decryptCurrentPassword = CryptoJS.AES.decrypt(
      encryptCurrentPassword.toString(),
      PASSWORD_ENCRYPT_KEY
    )
    if (decryptCurrentPassword.toString() !== decryptPassword.toString()) {
      return res.json(response.error({ message: 'Wrong old password' }))
    }
    const encryptNewPassword = CryptoJS.AES.encrypt(
      newPassword,
      PASSWORD_ENCRYPT_KEY
    )
    const updateUserPassword = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: encryptNewPassword.toString(),
        changePasswordAt: new Date(),
      },
    })
    res.json(
      response.success({
        item: updateUserPassword,
        allItemCount: 1,
        message: 'Password successfully updated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const getUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      profilePicture: true,
      role: true,
      hostInfo: {
        select: {
          work: true,
          hostedSince: true,
        },
      },
      listing: {
        include: {
          review: {
            include: {
              user: {
                select: {
                  guest: {
                    select: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      guest: {
        select: {
          firstName: true,
          lastName: true,
          confirm: true,
          Address: {
            select: {
              city: true,
              country: true,
            },
          },
        },
      },
    },
  })
  if (!getUser) {
    return res.json(response.error({ message: USER_NOT_EXIST }))
  }
  let countReviews = 0
  let listingReviewRating: number[] = []
  let totalRatings = 0
  let individualRating = 0
  getUser.listing.forEach((data: any) => {
    countReviews = countReviews + data.review.length
    data.review.forEach((reviewData: any) => {
      individualRating =
        (reviewData.accuracyRates +
          reviewData.checkInRates +
          reviewData.cleanLinessRates +
          reviewData.communicationRates +
          reviewData.locationRates +
          reviewData.valueRates) /
        6
      listingReviewRating.push(individualRating)
    })
  })
  listingReviewRating.forEach(
    (reviewRate) => (totalRatings = totalRatings + reviewRate)
  )
  // let rating = totalRatings / listingReviewRating.length
  // const newData = {
  //   profilePicture: getUser.profilePicture,
  //   userName: getUser.guest?.firstName + ' ' + getUser.guest?.lastName,
  //   role: getUser.role,
  //   countReviews: countReviews,
  //   ratings: Number.isNaN(rating) ? 0 : rating.toFixed(2),
  //   listingWithReviews: getUser.listing.map((listing) => ({
  //     ...listing,
  //     images: JSON.parse(listing.images),
  //     whereYoullBe: JSON.parse(listing.whereYoullBe),
  //     whereYoullSleep: JSON.parse(listing.whereYoullSleep),
  //   })),
  //   work: getUser.hostInfo?.work ? getUser.hostInfo.work : null,
  //   hostedSince: getUser.hostInfo?.hostedSince
  //     ? getUser.hostInfo.hostedSince
  //     : null,
  //   confirmInfo: JSON.parse(String(getUser.guest?.confirm)),
  // }
  const mockData = {
    school: 'LSPU',
    work: 'IT',
    live: '',
    language: 'English, French',
    decadeWereBorn: '80s',
    favoriteSong: 'I believe',
    obsessedWith: 'Her',
    funFact: '',
    uselessSkill: '',
    biography: '',
    spendTime: '',
    pets: 'Cat',
    aboutMe: 'I am nice person',
    profilePicture: null,
    userName: 'test account',
    role: 'Host',
    countReviews: 2,
    ratings: '4.50',
    listingWithReviews: [
      {
        id: 1,
        hostedById: 1,
        images: [
          {
            fileKey: '1.jpg',
            alt: 'image',
          },
          {
            fileKey: '2.jpg',
            alt: 'image',
          },
          {
            fileKey: '3.jpg',
            alt: 'image',
          },
          {
            fileKey: '4.jpg',
            alt: 'image',
          },
          {
            fileKey: '5.jpg',
            alt: 'image',
          },
        ],
        title: 'Test',
        descriptionId: null,
        address: 'Santa Maria, Laguna',
        listingPriceId: 1,
        category: 'Accomodation',
        favoriteBy: null,
        whereYoullBe: {
          description: 'Long description',
          workAround: 'Work around information',
        },
        whereYoullSleep: {
          kingBed: {
            count: 1,
            size: 'Large',
            icon: 'bed',
          },
        },
        createdAt: '2024-02-29T11:31:26.220Z',
        updatedAt: '2024-02-29T11:31:26.220Z',
        deletedAt: null,
        latitude: '1',
        longitude: '1',
        basicAboutPlaceId: null,
        review: [
          {
            id: 1,
            userId: 4,
            cleanLinessRates: 5,
            accuracyRates: 5,
            checkInRates: 5,
            communicationRates: 5,
            locationRates: 5,
            valueRates: 5,
            comment: 'No comment',
            createdAt: '2024-02-29T11:31:26.229Z',
            updatedAt: '2024-02-29T11:31:26.229Z',
            deletedAt: null,
            listingId: 1,
            user: {
              personalInfo: {
                firstName: 'Richard',
                lastName: 'Dela pena',
              },
            },
          },
          {
            id: 4,
            userId: 5,
            cleanLinessRates: 3,
            accuracyRates: 4,
            checkInRates: 5,
            communicationRates: 5,
            locationRates: 3,
            valueRates: 4,
            comment: 'No comment',
            createdAt: '2024-02-29T11:31:26.229Z',
            updatedAt: '2024-02-29T11:31:26.229Z',
            deletedAt: null,
            listingId: 1,
            user: {
              personalInfo: {
                firstName: 'Arjhay',
                lastName: 'Andal',
              },
            },
          },
        ],
      },
      {
        id: 4,
        hostedById: 1,
        images: [
          {
            fileKey: '4.jpg',
            alt: 'image',
          },
          {
            fileKey: '3.jpg',
            alt: 'image',
          },
          {
            fileKey: '2.jpg',
            alt: 'image',
          },
          {
            fileKey: '1.jpg',
            alt: 'image',
          },
          {
            fileKey: '5.jpg',
            alt: 'image',
          },
        ],
        title: 'Zkript View',
        descriptionId: null,
        address: 'Paete, Laguna',
        listingPriceId: 4,
        category: 'Accomodation',
        favoriteBy: null,
        whereYoullBe: {
          description: 'Long description',
          workAround: 'Work around information',
        },
        whereYoullSleep: {
          kingBed: {
            count: 1,
            size: 'Large',
            icon: 'bed',
          },
        },
        createdAt: '2024-02-29T11:31:26.220Z',
        updatedAt: '2024-02-29T11:31:26.220Z',
        deletedAt: null,
        latitude: '1',
        longitude: '23',
        basicAboutPlaceId: null,
        review: [],
      },
    ],
    hostedSince: null,
    confirmInfo: {
      identity: true,
      emailAddress: true,
      phoneNumber: true,
    },
  }
  res.json(
    response.success({
      item: mockData,
    })
  )
}
