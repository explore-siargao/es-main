import { UNKNOWN_ERROR_OCCURRED, USER_NOT_EXIST } from '@/common/constants'
import { prisma } from '@/common/helpers/prismaClient'
import { ResponseService } from '@/common/service/response'
import { Z_ReportUser } from '@repo/contract'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getAllReportUsers = async (req: Request, res: Response) => {
  try {
    const getAllReportUsers = await prisma.reportUser.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        reportedUser: {
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
        reportedByUser: {
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
      },
    })
    const allReportUsers = getAllReportUsers.map((reportUser: any) => ({
      id: reportUser.id,
      report: JSON.parse(reportUser.report),
      reportedBy: {
        name:
          reportUser.reportedByUser.guest?.firstName +
          ' ' +
          reportUser.reportedByUser.guest?.lastName,
        profilePicture: reportUser.reportedByUser.profilePicture,
        email: reportUser.reportedByUser.email,
      },
      reportedUser: {
        name:
          reportUser.reportedUser.guest?.firstName +
          ' ' +
          reportUser.reportedUser.guest?.lastName,
        profilePicture: reportUser.reportedByUser.profilePicture,
        email: reportUser.reportedUser.email,
      },
      createdAt: reportUser.createdAt,
    }))
    if (getAllReportUsers.length > 0) {
      res.json(
        response.success({
          items: allReportUsers,
          allItemCount: allReportUsers.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: allReportUsers,
          allItemCount: 0,
          message: 'No Reported Users found',
        })
      )
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(
      response.error({
        message: message,
      })
    )
  }
}

export const getReportsByReportedUserId = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const getReportsUserByReportedUser = await prisma.reportUser.findMany({
      where: {
        deletedAt: null,
        reportedUserId: userId,
      },
      include: {
        reportedByUser: {
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
        reportedUser: {
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
      },
    })

    const reportedUsersByReportedUser = getReportsUserByReportedUser.map(
      (reportUser: any) => ({
        id: reportUser.id,
        report: JSON.parse(reportUser.report),
        reportedUser: {
          email: reportUser.reportedUser.email,
          profilePicture: reportUser.reportedByUser.profilePicture,
          name:
            reportUser.reportedUser.guest?.firstName +
            ' ' +
            reportUser.reportedUser.guest?.lastName,
        },
        reportedBy: {
          email: reportUser.reportedByUser.email,
          profilePicture: reportUser.reportedByUser.profilePicture,
          name:
            reportUser.reportedByUser.guest?.firstName +
            ' ' +
            reportUser.reportedByUser.guest?.lastName,
        },
        createdAt: reportUser.createdAt,
      })
    )
    if (getReportsUserByReportedUser.length > 0) {
      res.json(
        response.success({
          items: reportedUsersByReportedUser,
          allItemCount: reportedUsersByReportedUser.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: reportedUsersByReportedUser,
          allItemCount: 0,
          message:
            'The user has not received any complaints from other users yet.',
        })
      )
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getReportsByResportedByUserId = async (
  req: Request,
  res: Response
) => {
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    const getReportUsersByReportedBy = await prisma.reportUser.findMany({
      where: {
        reportedBy: userId,
        deletedAt: null,
      },
      include: {
        reportedUser: {
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
        reportedByUser: {
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
      },
    })

    const reportUsersByreportedBy = getReportUsersByReportedBy.map(
      (reportUser: any) => ({
        id: reportUser.id,
        report: JSON.parse(reportUser.report),
        reportedUser: {
          name:
            reportUser.reportedUser.guest?.firstName +
            ' ' +
            reportUser.reportedUser.guest?.lastName,
          profilePicture: reportUser.reportedByUser.profilePicture,
          email: reportUser.reportedUser.email,
        },
        reportedBy: {
          name:
            reportUser.reportedByUser.guest?.firstName +
            ' ' +
            reportUser.reportedByUser.guest?.lastName,
          profilePicture: reportUser.reportedByUser.profilePicture,
          email: reportUser.reportedByUser.email,
        },
        createdAt: reportUser.createdAt,
      })
    )
    if (getReportUsersByReportedBy.length > 0) {
      res.json(
        response.success({
          items: reportUsersByreportedBy,
          allItemCount: reportUsersByreportedBy.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: reportUsersByreportedBy,
          allItemCount: 0,
          message: 'This User does not submit any reports to other users',
        })
      )
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getReportUserById = async (req: Request, res: Response) => {
  const reportId = Number(req.params.reportId)
  try {
    const getReportById = await prisma.reportUser.findFirst({
      where: {
        id: reportId,
        deletedAt: null,
      },
      include: {
        reportedUser: {
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
        reportedByUser: {
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
      },
    })
    if (!getReportById) {
      return res.json(response.success({ message: 'No report user found' }))
    }
    const newReportUser = {
      id: getReportById.id,
      report: JSON.parse(getReportById.report),
      reportedUser: {
        name:
          getReportById.reportedUser.guest?.firstName +
          ' ' +
          getReportById.reportedUser.guest?.lastName,
        profilePicture: getReportById.reportedUser.profilePicture,
        email: getReportById.reportedUser.email,
      },
      reportedBy: {
        name:
          getReportById.reportedByUser.guest?.firstName +
          ' ' +
          getReportById.reportedByUser.guest?.lastName,
        profilePicture: getReportById.reportedByUser.profilePicture,
        email: getReportById.reportedByUser.email,
      },
      createdAt: getReportById.createdAt,
    }
    res.json(
      response.success({
        item: newReportUser,
        allItemCount: 1,
        message: '',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const addReportUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { report, reportedUserId } = req.body
  const validateInputs = Z_ReportUser.safeParse(req.body)
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!validateInputs.success) {
      return res.json(response.error(JSON.parse(validateInputs.error.message)))
    }
    const newReportUser = await prisma.reportUser.create({
      data: {
        report: JSON.stringify(report),
        reportedUserId: reportedUserId,
        reportedBy: userId,
      },
    })
    res.json(
      response.success({
        item: newReportUser,
        allItemCount: 1,
        message: 'Report successfully submitted',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}
