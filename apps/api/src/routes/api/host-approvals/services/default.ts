import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { FileService } from '@/common/service/file'
import { ResponseService } from '@/common/service/response'
import { Z_Add_Host_Approval } from '@repo/contract-2/host-approval'
import { dbHostApproval } from '@repo/database'
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
    if (validHostApproval.success) {
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
          photocopyBusinessPermit: JSON.stringify([
            { fileKey: upload.key, createdAt: new Date() },
          ]),
        },
      })
      res.json(
        response.success({
          item: newHostApproval,
          message: 'Host approval request has been submitted',
        })
      )
    } else {
      console.error(validHostApproval.error.message)
      res.json(response.error({ message: 'Invalid payload' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
