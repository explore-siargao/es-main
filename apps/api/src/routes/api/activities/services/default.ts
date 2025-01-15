import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities, dbLocations } from '@repo/database'
import { convertPrice } from '@/common/helpers/convert-price'
import {format} from "date-fns"
const response = new ResponseService()

export const addActivity = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id

  try {
    const location = new dbLocations({
      streetAddress: null,
      barangay: null,
      city: null,
      latitude: null,
      longitude: null,
      howToGetThere: '',
    })
    await location.save()
    const value = {
      host: userId,
      title: '',
      activityType: '',
      description: '',
      highLights: [],
      durationHour: null,
      durationMinute: null,
      languages: [],
      isFoodIncluded: false,
      isNonAlcoholicDrinkIncluded: false,
      isAlcoholicDrinkIncluded: false,
      otherInclusion: [],
      notIncluded: [],
      whatToBrings: [],
      daysCanCancel: 0,
      notAllowed: [],
      policies: [],
      cancellationPolicies: [],
      photos: [],
      isSegmentBuilderEnabled: false,
      segments: [],
      meetingPoint: location._id,
      pricePerSlot: 0,
      pricePerPerson: 0,
      slotCapacity: {
        minimum: 0,
        maximum: 0,
      },
      status: 'Incomplete',
    }

    const newActivity = new dbActivities(value)
    await newActivity.save()

    res.json(
      response.success({
        item: newActivity,
        message: 'Activity successfully added',
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

export const getActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId, deletedAt: null })
      .populate({
        path: 'host',
        populate: {
          path: 'guest',
        },
      })
      .populate('meetingPoint')
      .populate('segments')
      .populate('photos')
    res.json(response.success({ item: getActivity }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getAllActivitiesByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const type = req.query.type

  if (!isHost) {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  } else {
    try {
      const filteredActivities = await dbActivities
        .find({
          host: hostId,
          ...(type && {
            experienceType: String(type)
              .toLowerCase()
              .replace(/^\w/, (c) => c.toUpperCase()),
          }),
        })
        .populate('host', 'email isHost')
        .populate('meetingPoint')
        .populate('photos')
        .select('title description status')
      res.json(
        response.success({
          items: filteredActivities,
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

export const getActivityByIdPublic = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  try {
    const activityId = req.params.activityId
    const activity = await dbActivities
      .findOne({
        _id: activityId,
        // status: E_Rental_Status.Pending,
      })
      .populate('meetingPoint')
      .populate('photos')
      .populate({
        path: 'host',
        select: "guest email createdAt",
        populate: {
          path: 'guest',
          populate:{
            path:"address",
            model:"Addresses"
          }
        },
      })
      .populate({
        path:"reviews",
        select:"reviewerId cleanlinessRates accuracyRates checkInRates communicationRates valueRates comment totalRates createdAt",
        populate:{
          path:"reviewer",
          model:"Users",
          select: "email guest",
          populate: [{ 
            path: 'guest',
            select:"firstName middleName lastName address",
            populate:{
              path:"address",
              model:"Addresses",
            }
          }],
        }
      })
      .exec()

    if (!activity) {
      res.json(
        response.error({
          status: 404,
          message: 'Rental with given ID not found!',
        })
      )
    } else {
      let averageTotalRates:number
      let totalReviewCount:number
      let averageCleanlinessRates:number
      let averageAccuracyRates:number
      let averageCheckInRates:number
      let averageCommunicationRates:number
      let averageValueRates:number
      let averageLocationRates:number
      const newActivity: any = activity.toObject()
      if(newActivity.reviews && newActivity.reviews.length > 0)
            {
             totalReviewCount = newActivity.reviews.length;
            averageTotalRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.totalRates, 0) /
            totalReviewCount;
      
            averageCleanlinessRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.cleanlinessRates, 0) /
            totalReviewCount;
      
            averageAccuracyRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.accuracyRates, 0) /
            totalReviewCount;
      
            averageCheckInRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.checkInRates, 0) /
            totalReviewCount;
      
            averageCommunicationRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.communicationRates, 0) /
            totalReviewCount;
      
            averageValueRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.valueRates, 0) /
            totalReviewCount;
      
            averageLocationRates =
            newActivity.reviews.reduce((sum:any, review:any) => sum + review.valueRates, 0) /
            totalReviewCount;
      
            //@ts-ignore
            newActivity.averageReviews = {
              totalReview:totalReviewCount,
              averageTotalRates:parseFloat(averageTotalRates.toFixed(2)),
              cleanliness:averageCleanlinessRates,
              accuracy:averageAccuracyRates,
              checkIn:averageCheckInRates,
              communication:averageCommunicationRates,
              value:averageValueRates,
              location:averageLocationRates
            };
            }
            //@ts-ignore
            newActivity.reviews = newActivity.reviews?.map((item)=>{
              //@ts-ignore
              const formatDate = format(new Date(item.createdAt), "MMMM dd, yyyy")
              console.log(formatDate)
              return{
              ...item,
              createdAt:formatDate
          }})
      newActivity.pricePerPerson =
        convertPrice(
          newActivity.pricePerPerson,
          preferredCurrency,
          conversionRates
        ) || 0
      newActivity.pricePerSlot =
        convertPrice(
          newActivity.pricePerSlot,
          preferredCurrency,
          conversionRates
        ) || 0
      res.json(
        response.success({
          item: newActivity,
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        status: 500,
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateItinerary = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const isHost = res.locals.user?.isHost

  if (!isHost) {
    res.json(
      response.error({
        message: 'User is not authorized to perform this action.',
      })
    )
  } else {
    try {
      const activity = await dbActivities.findOne({ _id: activityId })

      if (!activity) {
        res.json(
          response.error({
            message: 'Activity with the given ID not found!',
          })
        )
      } else {
        const { meetingPoint, isSegmentBuilderEnabled, segments } = req.body

        const updateMeetingPoint = await dbLocations.findByIdAndUpdate(
          activity?.meetingPoint,
          {
            $set: {
              streetAddress: meetingPoint.streetAddress,
              barangay: meetingPoint.barangay,
              city: meetingPoint.city,
              howToGetThere: meetingPoint.howToGetThere,
              longitude: meetingPoint.longitude,
              latitude: meetingPoint.latitude,
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )

        if (isSegmentBuilderEnabled) {
          if (segments.length < 2) {
            res.json(
              response.error({
                message: 'Please add at least 2 items in the itinerary builder',
              })
            )
          } else {
            // Handle the case where there are enough segments
            await dbActivities.findByIdAndUpdate(
              activityId,
              {
                $set: {
                  segments: segments,
                  isSegmentBuilderEnabled: isSegmentBuilderEnabled,
                  updatedAt: Date.now(),
                },
              },
              { new: true }
            )
          }
        } else {
          // Handle the case where the segment builder is not enabled
          await dbActivities.findByIdAndUpdate(
            activityId,
            {
              $set: {
                segments: segments,
                isSegmentBuilderEnabled: isSegmentBuilderEnabled,
                updatedAt: Date.now(),
              },
            },
            { new: true }
          )
        }

        if (
          activity?.status === 'Incomplete' &&
          !activity.finishedSections.includes('itinerary')
        ) {
          await dbActivities.findByIdAndUpdate(
            activityId,
            {
              $set: {
                updatedAt: Date.now(),
              },
              $addToSet: {
                finishedSections: 'itinerary',
              },
            },
            { new: true }
          )
        } else {
          console.log('Completed')
        }

        res.json(
          response.success({
            item: {
              meetingPoint: updateMeetingPoint,
              isSegmentBuilderEnabled,
              segments,
            },
            message: 'Itinerary successfully updated',
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : 'An unknown error occurred.',
        })
      )
    }
  }
}

export const getActivityCounts = async (req: Request, res: Response) => {
  try {
    const hostId = res.locals.user?.id

    const privateActivityCounts = await dbActivities.countDocuments({
      experienceType: 'Private',
      host: hostId,
    })

    const joinerActivityCounts = await dbActivities.countDocuments({
      experienceType: 'Joiner',
      host: hostId,
    })

    res.json(
      response.success({
        item: {
          private: privateActivityCounts,
          joiner: joinerActivityCounts,
        },
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
