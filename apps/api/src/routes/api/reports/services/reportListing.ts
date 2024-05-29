import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_ReportListing } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const getAllReportsListing = await prisma.reportListing.findMany({
      where: {
        deletedAt: null,
        listing: {
          id: {
            not: undefined,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            profilePicture: true,
            guest: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        listing: true,
      },
    })
    const modifyResult = getAllReportsListing.map((reportListing: any) => ({
      ...reportListing,
      listing: {
        ...reportListing.listing,
        images: JSON.parse(reportListing.listing.images),
        whereYoullBe: JSON.parse(reportListing.listing.whereYoullBe),
        whereYoullSleep: JSON.parse(reportListing.listing.whereYoullSleep),
      },
    }))

    const getAllReportsNewResults = modifyResult.map((reportListing: any) => ({
      id: reportListing.id,
      reports: JSON.parse(reportListing.reports),
      listing: reportListing.listing,
      reportedBy: {
        email: reportListing.user.email,
        name:
          reportListing.user.guest?.firstName +
          ' ' +
          reportListing.user.guest?.lastName,
        profilePicture: reportListing.user.profilePicture,
      },
      createdAt: reportListing.createdAt,
    }))

    if (getAllReportsListing.length !== 0) {
      res.json(
        response.success({
          items: getAllReportsNewResults,
          allItemCount: getAllReportsListing.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getAllReportsListing,
          allItemCount: getAllReportsListing.length,
          message: 'No reports found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getAllReportListingByReportedBy = async (
  req: Request,
  res: Response
) => {
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
    const reportListings = await prisma.reportListing.findMany({
      where: {
        reportedBy: userId,
      },
      include: {
        user: {
          select: {
            email: true,
            profilePicture: true,
            guest: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        listing: true,
      },
    })
    const modifiedResult = reportListings.map((reportListing: any) => ({
      id: reportListing.id,
      reports: JSON.parse(reportListing.reports),
      listing: {
        ...reportListing.listing,
        images: JSON.parse(reportListing.listing.images),
        whereYoullBe: JSON.parse(reportListing.listing.whereYoullBe),
        whereYoullSleep: JSON.parse(reportListing.listing.whereYoullSleep),
      },
      reportedBy: {
        email: reportListing.user.email,
        name:
          reportListing.user.guest?.firstName +
          ' ' +
          reportListing.user.guest?.lastName,
        profilePicture: reportListing.user.profilePicture,
      },
      createdAt: reportListing.createdAt,
    }))
    res.json(
      response.success({
        items: modifiedResult,
        allItemCount: modifiedResult.length,
        message: '',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getReportsByListing = async (req: Request, res: Response) => {
  const listingId = Number(req.params.listingId)
  try {
    const getListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    })
    if (!getListing) {
      return res.json(response.error({ message: 'Listing not found' }))
    }
    const reportsByListingId = await prisma.reportListing.findMany({
      where: {
        listingId: listingId,
      },
      include: {
        user: {
          select: {
            email: true,
            profilePicture: true,
            guest: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        listing: true,
      },
    })
    const modifyResult = reportsByListingId.map((reportListing: any) => ({
      ...reportListing,
      listing: {
        ...reportListing.listing,
        images: JSON.parse(reportListing.listing.images),
        whereYoullBe: JSON.parse(reportListing.listing.whereYoullBe),
        whereYoullSleep: JSON.parse(reportListing.listing.whereYoullSleep),
      },
    }))

    const getReportsByListingNewResults = modifyResult.map(
      (reportListing: any) => ({
        id: reportListing.id,
        reports: JSON.parse(reportListing.reports),
        listing: reportListing.listing,
        reportedBy: {
          email: reportListing.user.email,
          name:
            reportListing.user.guest?.firstName +
            ' ' +
            reportListing.user.guest?.lastName,
          profilePicture: reportListing.user.profilePicture,
        },
        createdAt: reportListing.createdAt,
      })
    )

    if (reportsByListingId.length !== 0) {
      res.json(
        response.success({
          items: getReportsByListingNewResults,
          allItemCount: reportsByListingId.length,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'No reports found' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getReport = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getReportById = await prisma.reportListing.findFirst({
      where: {
        id: id,
        deletedAt: null,
        listing: {
          id: {
            not: undefined,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
            profilePicture: true,
            guest: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        listing: true,
      },
    })

    if (!getReportById) {
      return res.json(
        response.error({
          message: 'Report already deleted or report data not found',
        })
      )
    }

    const modifyResult = {
      ...getReportById,
      listing: {
        ...getReportById?.listing,
        images: JSON.parse(getReportById?.listing.images as string),
        whereYoullBe: JSON.parse(getReportById?.listing.whereYoullBe as string),
        whereYoullSleep: JSON.parse(
          getReportById?.listing.whereYoullSleep as string
        ),
      },
      reports: JSON.parse(getReportById?.reports as string),
    }

    const getReportNewResults = {
      id: modifyResult.id,
      reports: modifyResult.reports,
      listing: modifyResult.listing,
      reportedBy: {
        email: modifyResult.user.email,
        name:
          modifyResult.user.guest?.firstName +
          ' ' +
          modifyResult.user.guest?.lastName,
        profilePicture: modifyResult.user.profilePicture,
      },
      createdAt: modifyResult.createdAt,
    }

    res.json(
      response.success({
        item: getReportNewResults,
        allItemCount: 1,
        message: '',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addReport = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { reports, listingId } = req.body
  const isInputValid = Z_ReportListing.safeParse(req.body)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!isInputValid.success) {
      return res.json(
        response.error({ message: JSON.parse(isInputValid.error.message) })
      )
    }
    const getListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    })
    if (!getListing) {
      return res.json(
        response.error({
          message: 'The listing you are trying to report was not found',
        })
      )
    }
    const newReport = await prisma.reportListing.create({
      data: {
        reports: JSON.stringify(reports),
        listingId: listingId,
        reportedBy: userId,
      },
    })
    res.json(
      response.success({
        item: newReport,
        allItemCount: 1,
        message: 'Report successfully submitted',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateReport = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { reports } = req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getReport = await prisma.reportListing.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getReport) {
      return res.json(
        response.error({
          message: 'Report that you are trying to update was not found',
        })
      )
    }
    if (reports) {
      const updateReportById = await prisma.reportListing.update({
        where: {
          id: id,
        },
        data: {
          reports: JSON.stringify(reports),
        },
      })
      res.json(
        response.success({
          item: updateReportById,
          allItemCount: 1,
          message: 'Report successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteReport = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getReport = await prisma.reportListing.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(
        response.error({
          message: USER_NOT_EXIST,
        })
      )
    }
    if (!getReport) {
      return res.json(
        response.error({
          message: 'Report not found or already deleted',
        })
      )
    }
    const removeReport = await prisma.reportListing.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeReport,
        allItemCount: 1,
        message: 'Report sucessfully deleted',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}
