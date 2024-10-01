import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_ReportListing } from '@repo/contract'
import { dbListings, dbReportListings, dbUsers } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getAllReportListingByReportedBy = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId
  try {
    const getUser = await dbUsers.findOne({
      _id: userId,
    })

    if (!getUser) {
      res.json(response.error({ message: USER_NOT_EXIST }))
    } else {
      const reportListings = await dbReportListings
        .find({
          reportedBy: userId,
        })
        .populate({
          path: 'reportedBy',
          select: 'email profilePicture ',
          populate: {
            path: 'guest',
            select: 'firstName lastName',
          },
        })
        .populate({
          path: 'listing',
        })

      const modifiedResult = reportListings.map((reportListing: any) => ({
        id: reportListing.id,
        reports: reportListing.reports,
        listing: reportListing.listing,
        reportedBy: {
          email: reportListing.reportedBy.email,
          name:
            reportListing.reportedBy.guest?.firstName +
            ' ' +
            reportListing.reportedBy.guest?.lastName,
          profilePicture: reportListing.reportedBy.profilePicture,
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
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getReportsByListing = async (req: Request, res: Response) => {
  const listingId = req.params.listingId
  try {
    const getListing = await dbListings.findById(listingId)
    if (!getListing) {
      res.json(
        response.error({
          message: 'Listing not found!',
        })
      )
    } else {
      const reportsByListingId = await dbReportListings
        .find({ listing: listingId })
        .populate('reportedBy', 'email profilePicture')

      const modifyResult = reportsByListingId.map((reportListing: any) => ({
        ...reportListing._doc,
        listing: {
          ...reportListing.listing._doc,
          images: JSON.parse(reportListing.listing.images),
          whereYoullBe: JSON.parse(reportListing.listing.whereYoullBe),
          whereYoullSleep: JSON.parse(reportListing.listing.whereYoullSleep),
        },
      }))

      const getReportsByListingNewResults = modifyResult.map(
        (reportListing: any) => ({
          id: reportListing.id,
          reports: reportListing.reports.map((report: string) =>
            JSON.parse(report)
          ),
          listing: reportListing.listing,
          reportedBy: {
            email: reportListing.reportedBy.email,
            name:
              reportListing.reportedBy.firstName +
              ' ' +
              reportListing.reportedBy.lastName,
            profilePicture: reportListing.reportedBy.profilePicture,
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
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message,
      })
    )
  }
}

export const addReport = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const { reports, listingId } = req.body
  const isInputValid = Z_ReportListing.safeParse(req.body)
  try {
    const getUser = await dbUsers.findById({ _id: userId })
    if (!getUser) {
      res.json(
        response.error({
          message: isInputValid.error?.message,
        })
      )
    } else {
      const getListing = await dbListings.findById({ _id: listingId })
      if (!getListing) {
        res.json(
          response.error({
            message: 'The listing you are trying to report was not found!',
          })
        )
      } else {
        const newReport = await new dbReportListings({
          reports: reports,
          listingId: listingId,
          reportedBy: userId,
        })
        await newReport.save()
        res.json(
          response.success({
            item: newReport,
            allItemCount: 1,
            message: 'Report successfully submitted!',
          })
        )
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message,
      })
    )
  }
}

export const deleteReport = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const id = req.params.id
  try {
    const getUser = await dbUsers.findOne({
      _id: userId,
    })
    const getReport = await dbReportListings.findOne({
      _id: id,
    })
    if (!getUser) {
      res.json(
        response.error({
          message: USER_NOT_EXIST,
        })
      )
    } else {
      if (!getReport) {
        res.json(
          response.error({
            message: 'Report not found or already deleted',
          })
        )
      } else {
        const removeReport = await dbReportListings.findByIdAndUpdate(
          id,
          {
            $set: {
              deletedAt: Date.now(),
            },
          },
          { new: true }
        )
        res.json(
          response.success({
            item: removeReport,
            allItemCount: 1,
            message: 'Report sucessfully deleted',
          })
        )
      }
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateReport = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const id = req.params.id
  const { reports } = req.body
  try {
    const getUser = await dbUsers.findById(userId)
    const getReport = await dbReportListings.findById(id)
    if (!getUser) {
      res.json(
        response.error({
          message: USER_NOT_EXIST,
        })
      )
    } else {
      if (!getReport) {
        res.json(
          response.error({
            message: 'The report that you are trying to update was not found!',
          })
        )
      } else {
        if (reports) {
          const updateReportById = await dbReportListings.findOneAndUpdate(
            { _id: id },
            { reports: reports },
            { new: true }
          )
          res.json(
            response.success({
              item: updateReportById,
              allItemCount: 1,
              message: 'Report successfully updated!',
            })
          )
        } else {
          res.json(
            response.error({
              message: REQUIRED_VALUE_EMPTY,
            })
          )
        }
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message,
      })
    )
  }
}

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const getAllReportsListing = await dbReportListings
      .find({
        deletedAt: null,
        'listing.id': { $ne: undefined },
      })
      .populate({
        path: 'user',
        select: 'email profilePicture',
        populate: {
          path: 'guest',
          select: 'firstName lastName',
        },
      })
      .populate('listing')

    const modifyResult = getAllReportsListing.map((reportListing: any) => ({
      reports: reportListing.reports,
      reportedBy: {
        email: reportListing.reportedBy.email,
        profilePicture: reportListing.reportedBy.profilePicture,
        guest: {
          firstName: reportListing.reportedBy.guest.firstName,
          lastName: reportListing.reportedBy.guest.lastName,
        },
      },
    }))

    const getAllReportsNewResults = modifyResult.map((reportListing: any) => ({
      id: reportListing.id,
      reports: reportListing.reports,
      listing: reportListing.listing,
      reportedBy: {
        email: reportListing.reportedBy.email,
        name:
          reportListing.reportedBy.guest?.firstName +
          ' ' +
          reportListing.reportedBy.guest?.lastName,
        profilePicture: reportListing.reportedBy.profilePicture,
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
