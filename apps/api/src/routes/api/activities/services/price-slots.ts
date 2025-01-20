import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { convertPrice } from '@/common/helpers/convert-price'
import { ResponseService } from '@/common/service/response'
import {
  T_Update_Activity_Price_Slots,
  Z_Update_Activity_Pice_Slots,
} from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updatePriceAndSlots = async (req: Request, res: Response) => {
  const {
    experienceType,
    schedule,
    slotCapacity,
    pricePerSlot,
    pricePerPerson,
  }: T_Update_Activity_Price_Slots = req.body
  const isHost = res.locals.user?.isHost
  const activityId = req.params.activityId
  const isValidInput = Z_Update_Activity_Pice_Slots.safeParse(req.body)
  if (isValidInput.success) {
    if (!isHost) {
      res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    } else {
      try {
        const activity = await dbActivities.findOne({
          _id: activityId,
          deletedAt: null,
        })
        if (!activity) {
          res.json(
            response.error({
              message: 'Activity not found!',
            })
          )
        } else {
          let ids = []
          if (slotCapacity.maximum > 0) {
            let i = 0
            while (i < slotCapacity.maximum) {
              ids.push({ name: `Slot ${i + 1}` })
              i++
            }
          }
          let newSchedule =
            activity.experienceType === 'Private'
              ? schedule
              : {
                  ...schedule,
                  monday: {
                    ...schedule.monday,
                    slots: schedule.monday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  tuesday: {
                    ...schedule.tuesday,
                    slots: schedule.tuesday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  wednesday: {
                    ...schedule.wednesday,
                    slots: schedule.wednesday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  thursday: {
                    ...schedule.thursday,
                    slots: schedule.thursday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  friday: {
                    ...schedule.friday,
                    slots: schedule.friday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  saturday: {
                    ...schedule.saturday,
                    slots: schedule.saturday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                  sunday: {
                    ...schedule.sunday,
                    slots: schedule.sunday?.slots?.map((slot, index) => {
                      return {
                        ...slot,
                        //@ts-ignore
                        slotIdsId: ids,
                      }
                    }),
                  },
                }

          const updatedPriceAndSlots = await dbActivities.findByIdAndUpdate(
            activity?._id,
            {
              $set: {
                schedule: newSchedule,
                slotCapacity: slotCapacity,
                updatedAt: Date.now(),
                ...(experienceType === 'Private'
                  ? {
                      pricePerSlot: pricePerSlot,
                      pricePerPerson: pricePerPerson,
                    }
                  : { pricePerPerson: pricePerPerson, pricePerSlot: 0 }),
              },
              $addToSet: {
                finishedSections: 'pricing',
              },
            },
            { new: true, runValidators: true }
          )
          res.json(
            response.success({
              item: updatedPriceAndSlots,
              message: 'Price and slots successfully updated!',
            })
          )
        }
      } catch (err: any) {
        res.json(
          response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
          })
        )
      }
    }
  } else {
    res.json(
      response.error({
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

export const getSlotPrice = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  const activityId = req.params.activityId
  const getActivity = await dbActivities.findOne({
    _id: activityId,
    deletedAt: null,
  })
  if (!getActivity) {
    res.json(response.error({ message: 'Activity not found' }))
  } else {
    try {
      const slotsDetail = {
        experienceType: getActivity.experienceType,
        schedule: getActivity.schedule,
        slotCapacity: getActivity.slotCapacity,
        pricePerSlot:
          convertPrice(
            getActivity.pricePerSlot,
            preferredCurrency,
            conversionRates
          ) || 0,
        pricePerPerson:
          convertPrice(
            getActivity.pricePerPerson,
            preferredCurrency,
            conversionRates
          ) || 0,
      }
      res.json(response.success({ item: slotsDetail }))
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
}
