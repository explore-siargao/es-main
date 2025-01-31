import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers/capitalizedFirstLetter'
import { FileService } from '@/common/service/file'
import { ResponseService } from '@/common/service/response'
import {
  E_Status,
  Z_Add_Host_Approval,
  Z_Approve_Reject_Host_Approval,
  Z_Host_Approvals,
  Z_Update_Host_Approval,
} from '@repo/contract-2/host-approval'
import { dbHostApproval, dbUsers } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
const fileService = new FileService()

export const addHostApproval = async (req: Request, res: Response) => {
  const userId = res.locals.user._id
  const { businessType, companyName, brn, registeredAddress } = req.body
  const files = req.files
  try {
    console.log(files)
    const upload = await fileService.upload({ files })

    const validHostApproval = Z_Add_Host_Approval.safeParse({
      businessType: businessType,
      companyName: companyName,
      brn: brn,
      registeredAddress: registeredAddress,
      photocopyBusinessPermit: JSON.stringify({
        fileKey: upload.key,
        createdAt: new Date(),
      }),
    })
    if (true) {
      const newHostApproval = new dbHostApproval({
        userId,
        businessType,
        companyName,
        brn,
        registeredAddress,
        createdAt: Date.now(),
      })

      await newHostApproval.save()
      await dbHostApproval.findByIdAndUpdate(newHostApproval._id, {
        $set: {
          photocopyBusinessPermit: JSON.stringify({
            fileKey: upload.key,
            createdAt: new Date(),
          }),
        },
      })
      res.json(
        response.success({
          item: newHostApproval,
          message: 'Host approval request has been submitted',
        })
      )
    } 
    // else {
    //   console.error(validHostApproval.error.message)
    //   res.json(response.error({ message: 'Invalid payload' }))
    // }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getRequestByHost = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const { status = 'all', page = 1, limit = 15 } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  let hostApprovals: any
  let totalCounts: any
  const newStatus = capitalizeFirstLetter(String(status))
  try {
    if (status === 'all' || status === 'All') {
      hostApprovals = await dbHostApproval
        .find({ userId: userId })
        .populate({
          path: 'userId',
          select: '_id guest',
          populate: {
            path: 'guest',
            select: '_id firstName lastName middleName',
          },
        })
        .populate({
          path: 'approvedBy',
          select: '_id guest',
          populate: {
            path: 'guest',
            select: '_id firstName lastName middleName',
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
      totalCounts = await dbHostApproval
        .find({ userId: userId })
        .countDocuments()
    } else if (
      newStatus === E_Status.Approved ||
      newStatus === E_Status.Pending ||
      newStatus === E_Status.Rejected ||
      newStatus === E_Status.Cancelled
    ) {
      hostApprovals = await dbHostApproval
        .find({ userId: userId, status: newStatus })
        .populate({
          path: 'userId',
          select: '_id guest',
          populate: {
            path: 'guest',
            select: '_id firstName lastName middleName',
          },
        })
        .populate({
          path: 'approvedBy',
          select: '_id guest',
          populate: {
            path: 'guest',
            select: '_id firstName lastName middleName',
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
      totalCounts = await dbHostApproval
        .find({ userId: userId, status: newStatus })
        .countDocuments()
    } else {
      res.json(response.error({ message: 'Invalid status' }))
      return
    }
    const valisHostApprovals = Z_Host_Approvals.safeParse(hostApprovals)
    if (valisHostApprovals.success) {
      res.json(
        response.success({
          items: hostApprovals,
          pageItemCount: hostApprovals.length,
          allItemCount: totalCounts,
        })
      )
    } else {
      console.error(valisHostApprovals.error.message)
      res.json(response.error({ message: 'Invalid host approvals data' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateHostApproval = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const { id } = req.params
  const { businessType, companyName, brn, registeredAddress } = req.body
  const files = req.files
  try {
    const getHostApproval = await dbHostApproval.findOne({
      _id: id,
      userId: userId,
      deletedAt: null,
    })
    if (!getHostApproval) {
      res.json(
        response.error({
          message: 'Invalid id or this item is not belong to you',
        })
      )
    } else {
      const status = getHostApproval?.status
      if (status === E_Status.Approved) {
        res.json(
          response.error({
            message:
              'You are not allowed to edit item that already approved by admin',
          })
        )
      } else {
        let upload: any
        const updateData: any = {
          businessType,
          companyName,
          brn,
          registeredAddress,
          status: 'Pending',
          updatedAt: Date.now(),
        }
        if (files) {
          upload = await fileService.upload({ files })
          updateData.photocopyBusinessPermit = JSON.stringify({
            fileKey: upload.key,
            createdAt: new Date(),
          })
        }
        const validUpdateData = Z_Update_Host_Approval.safeParse({
          ...updateData,
          id: id,
        })
        if (validUpdateData.success) {
          const updateHostApproval = await dbHostApproval.findByIdAndUpdate(
            id,
            {
              $set: updateData,
            }
          )
          res.json(
            response.success({
              item: updateHostApproval,
              message: 'Host approval request successfully updated',
            })
          )
        } else {
          console.error(validUpdateData.error.message),
            res.json(response.error({ message: 'Invalid payload' }))
        }
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

export const cancelHostApproval = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const { id } = req.params
  try {
    const getHostApproval = await dbHostApproval.findOne({
      _id: id,
      userId: userId,
      deletedAt: null,
    })
    if (!getHostApproval) {
      res.json(
        response.error({
          message: 'This item are not exist or already cancelled',
        })
      )
    } else {
      const status = getHostApproval.status
      if (
        status === E_Status.Approved ||
        status === E_Status.Rejected ||
        status === E_Status.Cancelled
      ) {
        res.json(
          response.error({
            message:
              'You are not allowed to cancell all rejected, cancelled and approved request',
          })
        )
      } else {
        const cancelRequest = await dbHostApproval.findByIdAndUpdate(id, {
          $set: {
            status: E_Status.Cancelled,
            deletedAt: Date.now(),
          },
        })
        res.json(
          response.success({
            item: cancelRequest,
            message: 'Request successfully cancelled',
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

export const getHostApprovalByAdmin = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const { status = 'all', page = 1, limit = 15 } = req.query
  const skip = (Number(page) - 1) * Number(limit)
  try {
    const verifyAdmin = await dbUsers.findOne({
      _id: userId,
      deletedAt: null,
      role: 'Admin',
    })
    if (!verifyAdmin) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    } else {
      let getAllHostApproval: any
      let totalCounts: number
      const newStatus = capitalizeFirstLetter(String(status))
      if (status === 'all' || status === 'All') {
        getAllHostApproval = await dbHostApproval
          .find({})
          .populate({
            path: 'userId',
            select: '_id guest',
            populate: {
              path: 'guest',
              select: '_id firstName lastName middleName',
            },
          })
          .populate({
            path: 'approvedBy',
            select: '_id guest',
            populate: {
              path: 'guest',
              select: '_id firstName lastName middleName',
            },
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
        totalCounts = await dbHostApproval.find({}).countDocuments()
      } else if (
        newStatus === E_Status.Approved ||
        newStatus === E_Status.Pending ||
        newStatus === E_Status.Rejected ||
        newStatus === E_Status.Cancelled
      ) {
        getAllHostApproval = await dbHostApproval
          .find({ status: newStatus })
          .populate({
            path: 'userId',
            select: '_id guest',
            populate: {
              path: 'guest',
              select: '_id firstName lastName middleName',
            },
          })
          .populate({
            path: 'approvedBy',
            select: '_id guest',
            populate: {
              path: 'guest',
              select: '_id firstName lastName middleName',
            },
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
        totalCounts = await dbHostApproval
          .find({ status: newStatus })
          .countDocuments()
      } else {
        res.json(response.error({ message: 'Invalid status' }))
        return
      }
      const validHostApprovals = Z_Host_Approvals.safeParse(getAllHostApproval)
      if (validHostApprovals.success) {
        res.json(
          response.success({
            items: validHostApprovals.data,
            pageItemCount: getAllHostApproval.length,
            allItemCount: totalCounts,
          })
        )
      } else {
        console.error(validHostApprovals.error.message)
        res.json(response.error({ message: 'Invalid host approvals data' }))
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
export const approveRejectHostApproval = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user.id
  const { id } = req.params
  const { status } = req.body
  const newStatus = capitalizeFirstLetter(String(status))
  try {
    const verifyAdmin = await dbUsers.findOne({
      _id: userId,
      deletedAt: null,
      role: 'Admin',
    })
    if (!verifyAdmin) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    } else {
      const checkIfPending = await dbHostApproval.findOne({
        _id: id,
        status: E_Status.Pending,
      })
      if (!checkIfPending) {
        res.json(
          response.error({
            message: "You can't approve or reject this request",
          })
        )
      } else {
        if (
          newStatus !== E_Status.Approved &&
          newStatus !== E_Status.Rejected
        ) {
          res.json(response.error({ message: 'Invalid status' }))
        } else {
          const updateData: any = {
            status: newStatus,
            updatedAt: Date.now(),
          }
          if (newStatus === E_Status.Approved) {
            updateData.approvedBy = userId
          }
          const validApproval = Z_Approve_Reject_Host_Approval.safeParse({
            id: id,
            status: newStatus,
          })
          if (validApproval.success) {
            const updateRequest = await dbHostApproval.findByIdAndUpdate(id, {
              $set: updateData,
            })
            res.json(
              response.success({
                item: updateRequest,
                message: `Request successfully ${newStatus === E_Status.Approved ? 'approved' : 'rejected'}`,
              })
            )
          } else {
            console.error(validApproval.error.message)
            res.json(response.error({ message: 'Invalid payload' }))
          }
        }
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
