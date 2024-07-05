import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities, dbLocations } from '@repo/database'

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
      cancellationDays: null,
      notAllowed: [],
      policies: [],
      cancellationPolicies: [],
      photos: [],
      isSegmentBuilderEnabled: false,
      segments: [],
      meetingPoint: location._id,
      price: {
        basePrice: 0,
        exceedingPerPersonPrice: 0,
      },
      slots: [],
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
    return res.json(
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
      .populate('host')
      .populate('meetingPoint')
      .populate('segments')
      .populate('photos')
    res.json(response.success({ item: getActivity }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getAllActivitiesByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
  try {
    const filteredActivities = await dbActivities
      .find({ host: hostId })
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
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateItinerary = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const isHost = res.locals.user?.isHost

  if (!isHost) {
    return res.json(
      response.error({
        message: 'User is not authorized to perform this action.',
      })
    )
  }

  try {
    const activity = await dbActivities.findOne({ _id: activityId })

    if (!activity) {
      return res.json(
        response.error({
          message: 'Activity with the given ID not found!',
        })
      )
    }

    const { meetingPoint, isSegmentBuilderEnabled, segments } = req.body

    const updateMeetingPoint = await dbLocations.findByIdAndUpdate(
      activity.meetingPoint,
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

    if (
      !activity.isSegmentBuilderEnabled &&
      isSegmentBuilderEnabled &&
      segments.length > 1
    ) {
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
    } else if (
      !activity.isSegmentBuilderEnabled &&
      isSegmentBuilderEnabled &&
      segments.length < 2
    ) {
      return res.json(
        response.error({
          message: 'Please add at least 2 item in the itinerary builder',
        })
      )
    } else if (activity.isSegmentBuilderEnabled && !isSegmentBuilderEnabled) {
      await dbActivities.findByIdAndUpdate(
        activityId,
        {
          $set: {
            isSegmentBuilderEnabled: isSegmentBuilderEnabled,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    }

    if (
      activity.status === 'Incomplete' &&
      !activity.finishedSections.includes('itinerary')
    ) {
      await dbActivities.findByIdAndUpdate(
        activityId,
        {
          $set: {
            finishedSections: ['basicInfo', 'itinerary'],
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
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
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : 'An unknown error occurred.',
      })
    )
  }
}
